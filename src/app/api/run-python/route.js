// src/app/api/run-python/route.js

import { spawn } from 'child_process';
import path from 'path';

export async function POST(req) {
  try {
    // Parse the request body as JSON
    const { inputText } = await req.json();

    if (!inputText) {
      return new Response(JSON.stringify({ error: "Input year is required." }), { status: 400 });
    }

    // Define the path to the Python script
    const scriptPath = path.join(process.cwd(), 'scripts', 'script2.py');

    // Spawn a child process to run the Python script
    const pythonProcess = spawn('python3', [scriptPath, inputText]);

    // Initialize variables to capture stdout and stderr
    let stdoutData = '';
    let stderrData = '';

    // Capture stdout
    pythonProcess.stdout.on('data', (data) => {
      stdoutData += data.toString();
    });

    // Capture stderr
    pythonProcess.stderr.on('data', (data) => {
      stderrData += data.toString();
    });

    // Wait for the process to close
    const exitCode = await new Promise((resolve) => {
      pythonProcess.on('close', resolve);
    });

    if (exitCode === 0) {
      // Successful execution
      try {
        const parsedOutput = JSON.parse(stdoutData.trim());
        return new Response(JSON.stringify({ output: parsedOutput }), { status: 200 });
      } catch (jsonError) {
        console.error("JSON Parsing Error:", jsonError);
        console.error("Received stdout:", stdoutData);
        return new Response(JSON.stringify({ error: "Failed to parse JSON output from Python script." }), { status: 500 });
      }
    } else {
      // Error occurred
      console.error("Python Script Error:", stderrData.trim());
      return new Response(JSON.stringify({ error: stderrData.trim() || "An error occurred in the Python script." }), { status: 500 });
    }
  } catch (error) {
    console.error("API Route Error:", error);
    // Handle unexpected errors
    return new Response(JSON.stringify({ error: "Internal Server Error." }), { status: 500 });
  }
}

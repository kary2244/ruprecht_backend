/*
|--------------------------------------------------------------------------
| JavaScript entrypoint for running ace commands
|--------------------------------------------------------------------------
|
| DO NOT MODIFY THIS FILE AS IT WILL BE OVERRIDDEN DURING THE BUILD
| PROCESS.
|
| See docs.adonisjs.com/guides/typescript-build-process#creating-production-build
|
| Since, we cannot run TypeScript source code using "node" binary, we need
| a JavaScript entrypoint to run ace commands.
|
| This file registers the "ts-node/esm" hook with the Node.js module system
| and then imports the "bin/console.ts" file.
|
*/

/**
 * Register hook to process TypeScript files using ts-node
 */
//import 'ts-node-maintained/register/esm'

/**
 * Import ace console entrypoint
 */
import 'ts-node/register'

// Detecta si estamos en producción (build) o desarrollo
import { existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const buildConsole = join(__dirname, 'build', 'bin', 'console.js')
const srcConsole = join(__dirname, 'bin', 'console.ts')

if (existsSync(buildConsole)) {
	await import(new URL('file://' + buildConsole.replace(/\\/g, '/')))
} else {
	await import(new URL('file://' + srcConsole.replace(/\\/g, '/')))
}

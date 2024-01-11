// File: translationLogic.ts

import mappings from './commandMappings.json';

export function translateToPowershell(command: string) {
  const translation = mappings.bashToPowershell[command];
  return translation 
    ? { 
        command: translation.command, 
        description: translation.description, 
        examples: translation.examples || [] 
      }
    : { command: "No direct translation found", description: "", examples: [] };
}

export function translateToBash(command: string) {
  const translation = mappings.powershellToBash[command];
  return translation 
    ? { 
        command: translation.command, 
        description: translation.description, 
        examples: translation.examples || [] 
      }
    : { command: "No direct translation found", description: "", examples: [] };
}


// Optional: Functions to get all commands for the live search
export function getAllBashCommands() {
  return Object.keys(mappings.bashToPowershell);
}

export function getAllPowershellCommands() {
  return Object.keys(mappings.powershellToBash);
}

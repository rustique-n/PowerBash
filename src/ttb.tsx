import { useState, useEffect } from 'react';
import { List, ActionPanel, Action } from '@raycast/api';
import { translateToBash, getAllPowershellCommands } from './translationLogic';

export default function TranslateToBash() {
  const [input, setInput] = useState('');
  const [translatedCommands, setTranslatedCommands] = useState([]);

  useEffect(() => {
    const results = [];
    const allCommands = getAllPowershellCommands();
    for (const command of allCommands) {
      if (command.startsWith(input)) {
        const translation = translateToBash(command);
        results.push({ 
          powershell: command, 
          bash: translation.command, 
          description: translation.description,
          examples: translation.examples.join(', ')
        });
      }
    }
    setTranslatedCommands(results);
  }, [input]);

  return (
    <List onSearchTextChange={setInput} searchBarPlaceholder="Type a PowerShell command...">
      {translatedCommands.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.powershell} → ${item.bash}`}
          subtitle={`Description: ${item.description}`}
          accessories={[{ text: `Examples: ${item.examples}` }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy Bash Command" content={item.bash} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

import { useState, useEffect } from 'react';
import { List, ActionPanel, Action } from '@raycast/api';
import { translateToPowershell, getAllBashCommands } from './translationLogic';

export default function TranslateToPowerShell() {
  const [input, setInput] = useState('');
  const [translatedCommands, setTranslatedCommands] = useState([]);

  useEffect(() => {
    const results = [];
    const allCommands = getAllBashCommands();
    for (const command of allCommands) {
      if (command.startsWith(input)) {
        const translation = translateToPowershell(command);
        results.push({ 
          bash: command, 
          powershell: translation.command, 
          description: translation.description,
          examples: translation.examples.join(', ')
        });
      }
    }
    setTranslatedCommands(results);
  }, [input]);

  return (
    <List onSearchTextChange={setInput} searchBarPlaceholder="Type a Bash command...">
      {translatedCommands.map((item, index) => (
        <List.Item
          key={index}
          title={`${item.bash} → ${item.powershell}`}
          subtitle={`Description: ${item.description}`}
          accessories={[{ text: `Examples: ${item.examples}` }]}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard title="Copy PowerShell Command" content={item.powershell} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}

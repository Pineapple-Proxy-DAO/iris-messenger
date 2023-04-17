import { createNymMixnetClient } from '@nymproject/sdk';

if (!window) {
  return;
}

const nym = await createNymMixnetClient();

const nymApiUrl = 'https://validator.nymtech.net/api';

await nym.client.start({
  clientId: 'My awesome client',
  nymApiUrl,
});

nym.events.subscribeToRawMessageReceivedEvent((e) => {
  console.log(e);
  console.log('Testing ' + new TextDecoder().decode(e.args.payload));
});

nym.events.subscribeToConnected((e) => {
  console.log('Connected to gateway', e);
});

window.nym = nym;
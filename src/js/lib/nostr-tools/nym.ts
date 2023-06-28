import {createNymMixnetClient, NymMixnetClient} from '@nymproject/sdk'

class NymClient {
  nym: NymMixnetClient | null
  isInitialized: boolean

  constructor() {
    this.nym = null
    this.isInitialized = false
    this.init()
  }

  async init() {
    if (typeof window === 'undefined') {
      return
    }

    this.nym = await createNymMixnetClient()

    if (!this.nym) {
      console.error('Oh no! Could not create client')
      return
    }

    const nymApiUrl = 'https://validator.nymtech.net/api'
    // WSS is mandatory for HTTPS website
    let preferredGatewayIdentityKey =
        'E3mvZTHQCdBvhfr178Swx9g4QG3kkRUun7YnToLMcMbM'
    let gatewayListener = 'wss://gateway1.nymtech.net:443'

    await this.nym.client.start({
      clientId: 'My awesome client',
      nymApiUrl,
      preferredGatewayIdentityKey: preferredGatewayIdentityKey,
      gatewayListener: gatewayListener
    })

    this.nym.events.subscribeToConnected(e => {
      console.log('Connected to gateway', e)
      console.log('Connected to gateway')
    })

    this.isInitialized = true
  }

  waitForNymClientReady(delay = 1000): Promise<void> {
    return new Promise(resolve => {
      const checkInitialization = () => {
        if (this.isInitialized) {
          resolve()
        } else {
          setTimeout(checkInitialization, delay)
        }
      }

      checkInitialization()
    })
  }
}

const nymClient = new NymClient()
export default nymClient

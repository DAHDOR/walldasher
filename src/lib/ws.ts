interface Subscribers {
  [key: string]: {
    [key: string]: ((data: unknown) => void)[]
  }
}

export const ws = {
  __subscribers: {} as Subscribers,

  socket: undefined as WebSocket | undefined,

  connected: false,

  registerQueue: [] as string[],

  init: function (
    port: number,
    debug: boolean,
    debugFilters: string[] | undefined
  ): void {
    if (debug) {
      if (debugFilters !== undefined) {
        console.warn(
          'WebSocket Debug Mode enabled with filtering. Only events not in the filter list  will be dumped'
        )
      } else {
        console.warn(
          'WebSocket Debug Mode enabled without filters applied. All events will be dumped to console'
        )
        console.warn(
          "To use filters, pass in an array of 'channel:event' strings to the second parameter of the init function"
        )
      }
    }

    ws.socket = new WebSocket('ws://localhost:' + port)

    ws.socket.onmessage = function (event): void {
      const json = JSON.parse(String(event.data)) as { event: string; data: unknown }
      if (!Object.prototype.hasOwnProperty.call(json, 'event')) {
        return
      }
      const eventSplit = json.event.split(':')
      const channel = eventSplit[0]
      const ev = eventSplit[1]
      if (debug) {
        if (!debugFilters) {
          console.log(channel, ev, json)
        } else if (debugFilters && debugFilters.indexOf(json.event) < 0) {
          console.log(channel, ev, json)
        }
      }
      ws.triggerSubscribers(channel, ev, json.data)
    }

    ws.socket.onopen = function (): void {
      ws.triggerSubscribers('ws', 'open', undefined)
      ws.connected = true
      ws.registerQueue.forEach(r => {
        ws.send('relay', 'register', r)
      })
      ws.registerQueue = []
    }

    ws.socket.onerror = function (): void {
      ws.triggerSubscribers('ws', 'error', undefined)
      ws.connected = false
    }

    ws.socket.onclose = function (): void {
      ws.triggerSubscribers('ws', 'close', undefined)
      ws.connected = false
    }
  },

  subscribe: function (
    channels: string | string[],
    events: string | string[],
    callback: (data: unknown) => void
  ): void {
    if (typeof channels === 'string') {
      const channel = channels
      channels = []
      channels.push(channel)
    }
    if (typeof events === 'string') {
      const event = events
      events = []
      events.push(event)
    }
    channels.forEach(function (c) {
      events.forEach(function (e) {
        if (!Object.hasOwnProperty.call(ws.__subscribers, c)) {
          ws.__subscribers[c] = {}
        }
        if (!Object.hasOwnProperty.call(ws.__subscribers[c], e)) {
          ws.__subscribers[c][e] = []
          if (ws.connected) {
            ws.send('relay', 'register', `${c}:${e}`)
          } else {
            ws.registerQueue.push(`${c}:${e}`)
          }
        }
        ws.__subscribers[c][e].push(callback)
      })
    })
  },

  clearEventCallbacks: function (channel: string, event: string): void {
    if (
      Object.hasOwnProperty.call(ws.__subscribers, channel) &&
      Object.hasOwnProperty.call(ws.__subscribers[channel], event)
    ) {
      ws.__subscribers[channel] = {}
    }
  },

  triggerSubscribers: function (channel: string, event: string, data: unknown): void {
    if (
      Object.hasOwnProperty.call(ws.__subscribers, channel) &&
      Object.hasOwnProperty.call(ws.__subscribers[channel], event)
    ) {
      ws.__subscribers[channel][event].forEach(function (callback) {
        callback(data)
      })
    }
  },

  send: function (channel: string, event: string, data: unknown): void {
    if (channel === 'local') {
      ws.triggerSubscribers(channel, event, data)
    } else {
      const cEvent = channel + ':' + event
      if (ws.socket) {
        ws.socket.send(
          JSON.stringify({
            event: cEvent,
            data: data
          })
        )
      } else {
        console.error('WebSocket is not connected.')
      }
    }
  }
}

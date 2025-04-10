import { Button } from '@kobalte/core/button'
import { openUrl } from '@tauri-apps/plugin-opener'

interface HyperLinkProps {
  url: string
  text: string
}

const HyperLink = (props: HyperLinkProps) => (
  <Button
    class="font-bold underline"
    onClick={() => {
      openUrl(props.url).catch(console.error)
    }}
  >
    {props.text}
  </Button>
)

export default HyperLink

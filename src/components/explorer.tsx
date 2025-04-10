import { Button } from '@components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@components/ui/tooltip'
import { useNavigate } from '@solidjs/router'
import { Icon } from 'solid-heroicons'
import { beaker, home, lifebuoy, presentationChartBar } from 'solid-heroicons/solid'
import { Component, JSX } from 'solid-js'
import { Settings } from './settings'

interface IconPath {
  path: JSX.Element
  outline?: boolean
  mini?: boolean
}

const NavButton: Component<{
  icon: IconPath
  label: string
  path: string
}> = ({ icon, label, path }) => {
  const navigate = useNavigate()
  return (
    <Tooltip closeDelay={0} placement="right">
      <TooltipTrigger
        class="w-full rounded-none"
        as={Button<'button'>}
        variant="ghost"
        onclick={() => navigate(path)}
      >
        <Icon path={icon} />
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

const Explorer: Component = () => {
  return (
    <div class="flex h-full w-10 flex-col">
      <div class="flex grow flex-col mt-1">
        <NavButton icon={home} label="Dashboard" path="/app" />
        <NavButton icon={presentationChartBar} label="Torneo" path="/app/tournament" />
        <NavButton icon={lifebuoy} label="Partido" path="/app/match" />
        <NavButton icon={beaker} label="Desarrollo" path="/app/dev" />
      </div>
      <div class="flex flex-col items-center justify-center py-2">
        <Settings />
      </div>
    </div>
  )
}

export { Explorer }

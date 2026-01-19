import * as React from "react"
import { Moon, Sun, Laptop } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const cycleMode = () => {
    if (theme === 'system') setTheme('light')
    else if (theme === 'light') setTheme('dark')
    else setTheme('system')
  }

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="glass bg-transparent border-primary/20">
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <Button 
      variant="outline" 
      size="icon" 
      className="glass bg-transparent border-primary/20 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white relative transition-colors duration-300 cursor-pointer"
      onClick={cycleMode}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0 absolute'}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0 absolute'}`} />
      <Laptop className={`h-[1.2rem] w-[1.2rem] transition-all ${theme === 'system' ? 'rotate-0 scale-100' : 'rotate-180 scale-0 absolute'}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export const getPlatformShortcut = () => {
  if (typeof window !== 'undefined' && /Mac/i.test(window.navigator.platform)) {
    return { label: '⌘ + S', hotkey: 'meta+s' }
  }
  return { label: 'Ctrl + S', hotkey: 'control+s' }
}

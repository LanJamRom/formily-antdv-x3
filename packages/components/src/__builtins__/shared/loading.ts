import { message } from 'ant-design-vue'

export const loading = async (loadingText = 'Loading...', processor: () => Promise<any>) => {
  let loadingInstance = null
  const loading = setTimeout(() => {
    loadingInstance = message.loading(loadingText)
  }, 100)
  try {
    return await processor()
  } finally {
    loadingInstance?.()
    clearTimeout(loading)
  }
}

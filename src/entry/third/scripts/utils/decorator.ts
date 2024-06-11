/* 提示装饰器 */
interface Params {
    content: string
    title?: string
    type?: string
    confirmButtonText?: string
    cancelButtonText?: string
    center?: boolean
}
// 提示装饰器
export function confirmDecorator(params: Params) {
    const { content, title = '提示', type = 'warning', confirmButtonText = '确定', cancelButtonText = '取消', center = false } = params
    return function(target: Record<string, any>, key: string | symbol, descriptor: PropertyDescriptor) {
        // console.log(target, key, descriptor, 'confirmDecorator')
        const method = descriptor.value
        descriptor.value = async (args: any) => {
            try {
                await target.$confirm(content, title, {
                    confirmButtonText,
                    cancelButtonText,
                    type,
                    center,
                })
                return method(args)
                // return method.apply(target, args)
            } catch (e) {}
        }
        return descriptor
    }
}

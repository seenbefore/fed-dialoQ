import MyDemoA from '@/components/global/my-demo-a'

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        MyDemoA: typeof MyDemoA
    }
}

export {}

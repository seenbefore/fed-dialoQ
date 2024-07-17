# store 注意事项

**如果 `VuexModule` 继承别的 module 在挂载阶段如果在 `Action` 中直接使用别的 `Action` 或者 `Mutation` 会报错。所以 Action 需要使用基类中 context 的方法掉用别的 Action 和 Mutation**

```typescript
@Action
public examples () {
    // 调用 Mutation
    this.context.commit('mutation name', 'params')
    
    // 调用 Action
    this.context.dispatch('action name', 'params')
    
    /* 获取getters */
    this.context.getters['getter name']
    
    /* 获取state */
    this.context.state['state name']
}
```

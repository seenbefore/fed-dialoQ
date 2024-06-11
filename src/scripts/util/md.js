const Config = require('markdown-it-chain')
const anchorPlugin = require('markdown-it-anchor')
const slugify = require('transliteration').slugify
const mdContainer = require('markdown-it-container')
// TODO: 引入VUE报错
// const containers = md => {
//     md.use(mdContainer, 'demo', {
//         validate(params) {
//             return params.trim().match(/^dada\s*(.*)$/)
//         },
//         render(tokens, idx) {
//             const m = tokens[idx].info.trim().match(/^dada\s*(.*)$/)
//             console.log(222, tokens[idx].nesting)
//             if (tokens[idx].nesting === 1) {
//                 const description = m && m.length > 1 ? m[1] : ''
//                 const content =
//                     tokens[idx + 1].type === 'fence'
//                         ? tokens[idx + 1].content
//                         : ''
//                 return `<demo-block>
//         ${description ? `<div>${md.render(description)}</div>` : ''}
//         <!--element-demo: ${content}:element-demo-->
//         `
//             }
//             return '</demo-block>'
//         },
//     })

//     md.use(mdContainer, 'tip')
//     md.use(mdContainer, 'warning')
// }
// const containers = require('./containers')
// const overWriteFenceRule = require('./fence')

const config = new Config()

config.options
    .html(true)
    .end()

    .plugin('anchor')
    .use(anchorPlugin, [
        {
            level: 2,
            //slugify: slugify,
            permalink: true,
            permalinkBefore: true,
        },
    ])
    .end()
// .plugin('containers')
// .use(containers)
// .end()

const md = config.toMd()
module.exports = md

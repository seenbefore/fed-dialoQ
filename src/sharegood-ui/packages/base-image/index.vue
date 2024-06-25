<script lang="tsx">
export default {
    name: 'BaseImage',
    props: {
        src: {
            type: [String, Function],
            default: '',
        },
    },
    data() {
        return {
            mySrc: '',
            loading: false,
        }
    },
    watch: {
        src: {
            async handler() {
                const mySrc = typeof this.src === 'function' ? this.src : () => this.src
                this.loading = false
                try {
                    const src = await mySrc()
                    this.mySrc = src
                } catch (error) {
                } finally {
                    this.loading = false
                }
            },
            immediate: true,
        },
    },
    render() {
        return <img src={this.mySrc} />
    },
}
</script>

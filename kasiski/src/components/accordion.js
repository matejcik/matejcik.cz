export default {
    props: {
        label: String,
        cardId: String,
        collapsible: {
            type: Boolean,
            default: true,
        },
        collapsed: Boolean,
    },
    data() {
        return {
            isCollapsed: this.collapsed,
        }
    },
    methods: {
        toggleThis() {
            this.isCollapsed = !this.isCollapsed
        }
    }
}

import Vue from 'vue'
import { registryRequireContextComponents } from '@/scripts/utils'

registryRequireContextComponents(require.context('./global', true, /index\.vue$/), Vue)

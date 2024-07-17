import { registryRequireContextComponents } from '@/scripts/utils'
import Vue from 'vue'

registryRequireContextComponents(require.context('./global', true, /index\.vue$/), Vue)

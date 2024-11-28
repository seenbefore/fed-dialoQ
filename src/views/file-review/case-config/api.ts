import { getArchiveVolumeConfigPageList, removeArchiveVolumeConfig, ArchiveVolumeConfigVO } from '@/services/auto/config/archiveVolume'
import { getDictList } from '@/services/auto/archiveDict'
export type VO = ArchiveVolumeConfigVO
export { getArchiveVolumeConfigPageList as list, removeArchiveVolumeConfig as remove, getDictList }

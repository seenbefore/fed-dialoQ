import { list, ArchiveVolumeVO, saveVolumeCover } from '@/services/auto/my/volume'
import { getDictList } from '@/services/auto/archiveDict'

export type VO = ArchiveVolumeVO

export { list, getDictList, saveVolumeCover as save }

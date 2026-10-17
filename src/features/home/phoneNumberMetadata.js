import { getCountries, getCountryCallingCode, Metadata } from 'libphonenumber-js'
import metadata from 'libphonenumber-js/metadata.min.json'

const metadataReader = new Metadata(metadata)
const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })

const NANP_AREA_CODES = {
  AG: ['268'],
  AI: ['264'],
  AS: ['684'],
  BB: ['246'],
  BM: ['441'],
  BS: ['242'],
  DM: ['767'],
  DO: ['809', '829', '849'],
  GD: ['473'],
  GU: ['671'],
  JM: ['876'],
  KN: ['869'],
  KY: ['345'],
  LC: ['758'],
  MP: ['670'],
  MS: ['664'],
  PR: ['787', '939'],
  SX: ['721'],
  TC: ['649'],
  TT: ['868'],
  VC: ['784'],
  VG: ['284'],
  VI: ['340'],
}

export const typicalNationalLengths = Object.fromEntries(
  `
  AF:9 AX:8-9 AL:9 DZ:9 AS:7 AD:6 AO:9 AI:7 AG:7 AR:10 AM:8 AW:7
  AC:4 AU:9 AT:10-13 AZ:9 BS:7 BH:8 BD:10 BB:7 BY:9 BE:8-9 BZ:7 BJ:8 BM:7 BT:7
  BO:8 BA:8 BW:7-8 BR:10-11 IO:7 BN:7 BG:8-9 BF:8 BI:8 KH:8-9 CM:9 CA:10 CV:7
  BQ:7 KY:7 CF:8 TD:8 CL:9 CN:11 CX:9 CC:9 CO:10 KM:7 CG:9 CD:9 CK:5 CR:8 CI:10
  HR:8-9 CU:8 CW:7-8 CY:8 CZ:9 DK:8 DJ:8 DM:7 DO:7 EC:8-9 EG:9-10 SV:8 GQ:9 ER:7
  EE:7-8 SZ:8 ET:9 FK:5 FO:6 FJ:7 FI:6-10 FR:9 GF:9 PF:6 GA:7 GM:7 GE:9 DE:10-11
  GH:9 GI:8 GR:10 GL:6 GD:7 GP:9 GU:7 GT:8 GG:10 GN:9 GW:7 GY:7 HT:8 HN:8 HK:8
  HU:8-9 IS:7 IN:10 ID:9-12 IR:10 IQ:10 IE:9 IM:10 IL:8-9 IT:9-10 JM:7 JP:10 JE:10
  JO:8-9 KZ:10 KE:9 KI:5 XK:8 KW:8 KG:9 LA:8-10 LV:8 LB:7-8 LS:8 LR:7-8 LY:9
  LI:7 LT:8 LU:4-11 MO:8 MG:9 MW:9 MY:9-10 MV:7 ML:8 MT:8 MH:7 MQ:9 MR:8 MU:7
  YT:9 MX:10 FM:7 MD:8 MC:8-9 MN:8 ME:8-9 MS:7 MA:9 MZ:9 MM:8-10 NA:9 NR:7 NP:10
  NL:9 NC:6 NZ:8-10 NI:8 NE:8 NG:10 KP:6-10 MK:8 MP:7 NO:8 OM:8 PK:10 PW:7 PS:9
  PA:8 PG:7-8 PY:9 PE:9 PH:10 PL:9 PT:9 PR:7 QA:8 RE:9 RO:9 RU:10 RW:9 WS:5-7
  SM:6-10 ST:7 SA:9 SN:9 RS:8-9 SC:7 SL:8 SG:8 SX:7 SK:9 SI:8 SB:5-7 SO:7-8 ZA:9
  KR:9-10 SS:9 ES:9 LK:9 SH:4-5 KN:7 LC:7 MF:9 PM:6 VC:7 SD:9 SR:6-7 SJ:8 SE:7-9
  CH:9 SY:8-9 TW:8-9 TJ:9 TZ:9 TH:8-9 TL:7-8 TG:8 TO:5 TT:7 TA:4 TN:8 TM:8 TC:7
  TR:10 TV:5-6 VI:7 VG:7 BL:9 UG:9 UA:9 AE:8-9 GB:10 US:10 UY:8 UZ:9 VU:5-7 VA:6-10 VE:10
  VN:9 WF:6 EH:9 YE:7-9 ZM:9 ZW:9
  `
    .trim()
    .split(/\s+/)
    .map((entry) => {
      const [iso2, lengths] = entry.split(':')
      const [minimum, maximum = minimum] = lengths.split('-').map(Number)
      return [iso2, Array.from({ length: maximum - minimum + 1 }, (_, index) => minimum + index)]
    }),
)

function getFlagEmoji(countryCode) {
  return String.fromCodePoint(
    ...Array.from(countryCode, (letter) => 127397 + letter.charCodeAt(0)),
  )
}

export function formatPhoneLengths(lengths) {
  const sortedLengths = [...new Set(lengths)].sort((left, right) => left - right)
  const ranges = []

  for (const length of sortedLengths) {
    const lastRange = ranges.at(-1)
    if (lastRange && length === lastRange[1] + 1) {
      lastRange[1] = length
    } else {
      ranges.push([length, length])
    }
  }

  return ranges
    .map(([start, end]) => (start === end ? `${start}` : `${start}–${end}`))
    .join(', ')
}

export const countries = getCountries()
  .map((iso2) => {
    const areaCodes = NANP_AREA_CODES[iso2] ?? []
    const countryMetadata = metadataReader.country(iso2)
    const callingCode = getCountryCallingCode(iso2)
    const nationalLengths =
      typicalNationalLengths[iso2] ?? countryMetadata.possibleLengths()

    return {
      iso2,
      name: regionNames.of(iso2) || iso2,
      callingCode,
      displayCallingCode:
        callingCode === '1' && areaCodes.length
          ? `1 ${areaCodes.join('/')}`
          : callingCode,
      buttonCallingCode:
        callingCode === '1' && areaCodes.length > 1 ? callingCode : undefined,
      areaCodes,
      nationalLengths,
      subscriberLengths: nationalLengths,
      flag: getFlagEmoji(iso2),
    }
  })
  .sort((left, right) => left.name.localeCompare(right.name, 'en'))

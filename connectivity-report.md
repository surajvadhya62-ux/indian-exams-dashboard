# Authority Portal Connectivity Report

**Run at:** 2026-09-18T10:43:23.789Z
**Runner location:** San Jose, California, US (AS8075 Microsoft Corporation)
**Portals tested:** 38

## Summary

| Outcome | Count | Share | Meaning |
|---|---:|---:|---|
| Usable | 12 | 32% | Real page content returned; can be read automatically |
| Blank shell | 2 | 5% | Responded "OK" but delivered no readable text — needs a browser engine |
| HTTP error | 2 | 5% | Server refused or errored |
| Unreachable | 22 | 58% | Timed out, DNS failure, or certificate rejected |

## Full results

| Authority | Outcome | HTTP | Time | Readable text (chars) | Notice keywords | Error |
|---|---|---:|---:|---:|---|---|
| Andhra Pradesh — APPSC | UNREACHABLE | — | 10077ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: psc.ap.gov.in:443, timeout: 10000ms)` |
| Arunachal Pradesh — APPSC | OK | 200 | 5081ms | 7391 | yes |  |
| Assam — APSC | UNREACHABLE | — | 10161ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: apsc.nic.in:443, timeout: 10000ms)` |
| Bihar — BPSC | UNREACHABLE | — | 10036ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: bpsc.bih.nic.in:443, timeout: 10000ms)` |
| Chhattisgarh — CGPSC | UNREACHABLE | — | 10140ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: psc.cg.gov.in:443, timeout: 10000ms)` |
| Delhi — undefined | UNREACHABLE | — | 10482ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: dsssb.delhi.gov.in:443, timeout: 10000ms)` |
| Goa — GPSC | HTTP_ERROR | 403 | 842ms | 17 | no |  |
| Gujarat — GPSC | UNREACHABLE | — | 529ms | 0 | no | `ETIMEDOUT: fetch failed` |
| Haryana — HPSC | UNREACHABLE | — | 10484ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: hpsc.gov.in:443, timeout: 10000ms)` |
| Himachal Pradesh — HPPSC | UNREACHABLE | — | 893ms | 0 | no | `ERR_SSL_UNSAFE_LEGACY_RENEGOTIATION_DISABLED: 803C2BEA967F0000:error:0A000152:SSL routines:final_renegotiate:unsafe legacy renegotiation disabled:../deps/openssl/open` |
| Institute of Banking Personnel Selection (IBPS) | UNREACHABLE | — | 1589ms | 0 | no | `UNABLE_TO_VERIFY_LEAF_SIGNATURE: unable to verify the first certificate` |
| Jammu & Kashmir — JKPSC | UNREACHABLE | — | 706ms | 0 | no | `UNABLE_TO_VERIFY_LEAF_SIGNATURE: unable to verify the first certificate` |
| Jharkhand — JPSC | OK | 200 | 1192ms | 7641 | yes |  |
| Karnataka — KPSC | OK | 200 | 1501ms | 2229 | yes |  |
| Kerala — Kerala PSC | OK | 200 | 4820ms | 2613 | yes |  |
| Ladakh — undefined | OK | 200 | 1514ms | 10149 | yes |  |
| Madhya Pradesh — MPPSC | OK | 200 | 1568ms | 7953 | yes |  |
| Maharashtra — MPSC | BLANK_SHELL | 200 | 713ms | 51 | no |  |
| Manipur — MPSC | UNREACHABLE | — | 1467ms | 0 | no | `UNABLE_TO_VERIFY_LEAF_SIGNATURE: unable to verify the first certificate` |
| Meghalaya — MPSC | UNREACHABLE | — | 239ms | 0 | no | `ENOTFOUND: getaddrinfo ENOTFOUND mpsc.nic.in` |
| Mizoram — MPSC | HTTP_ERROR | 403 | 532ms | 17 | no |  |
| Nagaland — NPSC | OK | 200 | 1327ms | 3121 | yes |  |
| National Testing Agency (NTA) | OK | 200 | 2160ms | 111974 | yes |  |
| Odisha — OPSC | OK | 200 | 3003ms | 6077 | yes |  |
| Punjab — PPSC | UNREACHABLE | — | 10486ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted addresses: 117.220.2.183:443, 164.100.146.174:443, timeout: 10000ms)` |
| Railway Recruitment Boards (RRB) | UNREACHABLE | — | 946ms | 0 | no | `ECONNREFUSED: connect ECONNREFUSED 203.176.112.122:443` |
| Rajasthan — RPSC | UNREACHABLE | — | 593ms | 0 | no | `ETIMEDOUT: fetch failed` |
| Reserve Bank of India (RBI) | OK | 200 | 1336ms | 3533 | yes |  |
| Sikkim — SPSC | UNREACHABLE | — | 10264ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: spsc.sikkim.gov.in:443, timeout: 10000ms)` |
| Staff Selection Commission (SSC) | BLANK_SHELL | 200 | 1247ms | 39 | no |  |
| State Bank of India Recruitment (SBI) | UNREACHABLE | — | 11893ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: sbi.co.in:80, timeout: 10000ms)` |
| Tamil Nadu — TNPSC | UNREACHABLE | — | 10151ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: tnpsc.gov.in:443, timeout: 10000ms)` |
| Telangana — TGPSC | UNREACHABLE | — | 237ms | 0 | no | `ENOTFOUND: getaddrinfo ENOTFOUND tspsc.gov.in` |
| Tripura — TPSC | UNREACHABLE | — | 10054ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: tpsc.tripura.gov.in:443, timeout: 10000ms)` |
| Union Public Service Commission (UPSC) | OK | 200 | 930ms | 12049 | yes |  |
| Uttar Pradesh — UPPSC | OK | 200 | 4784ms | 12048 | yes |  |
| Uttarakhand — UKPSC | UNREACHABLE | — | 10483ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: psc.uk.gov.in:443, timeout: 10000ms)` |
| West Bengal — WBPSC | UNREACHABLE | — | 10193ms | 0 | no | `UND_ERR_CONNECT_TIMEOUT: Connect Timeout Error (attempted address: psc.wb.gov.in:443, timeout: 10000ms)` |

## Notes

- `BLANK_SHELL` is the dangerous category: the request succeeds, so naive code records a
  successful check while having learned nothing. These portals render content via JavaScript.
- Certificate rejections usually mean the site serves an incomplete chain, not that it is unsafe.
- Compare the outcome here against the same URLs fetched from an Indian IP to detect geo-blocking.


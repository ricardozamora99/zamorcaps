import CatalogSlider from "../CatalogSlider/CatalogSlider";
import zamorLogodf from "../Images/logo ZAMOR CAPS.jpg";

const IMG_GORRA_AZUL = "https://ucddf966515d30e4a4d2f31cae60.previews.dropboxusercontent.com/p/thumb/AC53CReTPJ1cRX5KjHxLdjX96Oi-u_YjHTt0uPwqlheW1KIHi1e252mErVrK9Ps5tv1wzCpIQTnD2hJ022tXOjUktRB69JNUZlFM1jU7Qv_YVlC27tcIpevMdSWSP0WSTIn0P9y73jQLqk10Ars08esspi1CPqZAc_PzSeGcmDUCGAOVU-9XXVQyYyYnZrWiwzvLGi9Ct-tPcSmU1VGqGwQPa_hwnCUWpug5Z8TgBlyjoZfDrT80-Gq2BwYw2_12LCPW9wRfCm1B2lM2XJpV2cGzSivLa0gtO_qK1VLbsIpJLaul9KWyvPAlxUkIUfurT2U6NSyWHbhN0uQt3Vctxylc2grOvI2oJZo5Cn8iTuGXkmwh0Q44eBDbQkF5jF0ztbsCNdAYze45B1l0wwI6CWSU-X5VgwvVmYh96PN5aK8PGnHV6_hwmYzZ6iAG5UOCgdzlchJhj5Pmv_xp-X5hNPdh/p.png?is_prewarmed=true";
const IMG_GORRA_NEGRA = "https://ucaf4f6ded1c3c99bebbef44472b.previews.dropboxusercontent.com/p/thumb/AC4ERFmUjtSnFMrBaOVTqIb0ybsWcbFjU2glwTpqDBikgMt-QPR5j_3IBtMfivIfn0E9eC0eKqEndMahIO0IlhLmhRWtFbUoXu2Oj9PIAheVbwKdxDoKEpmoZhAPzmln7M_7GEq2LSMt6OUP0wbXfpYw8LKrOgfwHFpdM4Tuuo4m65FYQ0AemZCdhs2GHFb51SiAgp8zFTKkT-tzFluJxSi6-3SP4lACZfAle15whz_MWKYR3i1JjR95Ao4z4PPlpEJVeJ54R_HZNlQcIqrVccn5fbTjuvVNjoYiigfSljfhLauUym67gQyIXxKG-__A_thT0yweYh099zJv6JUi5kbCz1EXIHZjv7RjdmT_pNs_HAaEb9BCBYQQfEaudVcaNvG-_aTvKCDxTrTvQzSX0Fm2/p.jpeg?is_prewarmed=true" ;
const IMG_TORONTO_BLUEJAY = "https://uc1f8a4bc13d9c15ae09ee2d7d6d.previews.dropboxusercontent.com/p/thumb/AC6nWGP494pFeQlUnn7Gfkn1mElMjJBaBzoz8AXJBSfsPMKXSuEF66Mt2WNjhM_ca_bvpqAJ9qImxhPYE6MmY810WHAx_xyJkYPEWPhwxPJYLMDOA9nu-5kLu45T_LCMtr8AUEE0w_LFE51wXu2o3cAASpchLmVf2YJQiMZzCr7x7rZGzC0wAlGjZUR7Yv0_R5F2CxGdwvYTAm-o93bwiA-_7GbhVsL_FU0ci-5KNvz7poa-BDc9bp3hBloTRe1iPLgQc9Ig64cccbnzygvRvsK-paNsLqKQdojnTJlFo_Hp-T9cxXFd5dk6Fa2A_0sB0grXXBVvjk55eZOmrZiJpFJNCvcQ3OFHjEk-CGUgv0EKdpwm2MAMIik61qvN0Rfhj8OGjP4i1jQIzNuK11UQpWXX/p.jpeg?is_prewarmed=true";
const IMG_COCODRILE_RED = "https://ucea7f1ebc629a3095004649559f.previews.dropboxusercontent.com/p/thumb/AC47lesWw5fjjBcxccERHCoQ3wmDkQLqf1uR1ouv8yJVy2jimtexZn53S71c4XrTgorE_zx1q2Lnx347NWovLOgphOO_OFMdmPwSwMzkZ2Yvvt_zWwXTx7-ROJdDFRYcNU-VOmAxe_fgm-wsLAuy0kFDOni6OpTZQNNC8ipNCNRnxVwBJn_TgsZPsb_wz3XSFI1szOkpq3dML-SiVA7pD4SYy1bJGkrGSe-v3MHP0YRUmcgx4wsfAY-dCPEPq3rTJE7-1q6wSl_R5x3-b8RXacTS4t7Zn00zo8RhuRZXWmy7IVDfPyKPsIT1WLnUJJDiY4k80NHnlxRDu344b_sn3scE0bpyqf2L45wpNDU_M2uUF-QO7zYdiidty-tsrROFS7BRsh1eRy12vC_3Nve9W02e/p.png?is_prewarmed=true";
const IMG_COLUMBIA_1 = "https://ucf56d546f21cf1ef941584fce1e.previews.dropboxusercontent.com/p/thumb/AC5tToPLJfUHwolyRZqPgjc5cWl413BVTbR1z9jx7Lpm3HPL1ewmcDSg4ElTjkPtmKOkGP-I1z1Gor4wj05EB5e5LSJBm7Vt9V0AP-XxBZWdZ_Lf7TsARPzg0TDfn-Vi1R75DdR0cZ1ghBcsFtVgnnOaD2J2egRxurGyESf7bh8idHUTrTSQLPezidf_ogAbda-QspGlc6XpFcvN5vMlTcLxxgdMwk_gJL473jOpCwIi_s5uindnlb2rgvFUnsUB9scjp6OPh7KYqUi31y8IXLqtn7Qbepr9RD-p62zU3YWKnmiIWvL5uKy4exseOzv27BFwUGpDAU1bVb2V5gothN11qe9U2n0RhQBsQ1D2EvVkHFhjvjJF221NANfWYOBY4Q96jnN3QyD-7mAkET5P1hAU/p.png?is_prewarmed=true";
const IMG_NEWYORK1_WHITE ="https://uc78631b2db0ced7050ca3ef2fea.previews.dropboxusercontent.com/p/thumb/AC7QVN5BR5Ao39nFBJci78Uy-85Cxx8qEG7_57dBbhF6iR1zcGugZpMmS1TL_JA1Tfjzc7RO9rEzVFqyzDhKywhCFYW_p-EZQ58RNcMMGBpdN-6871JcSBnSyP4zs2oeUDUaXGlNwPdsnKIawifOIcvnhilyBUiCs29uGLzeo3PizGMrhTtU4Yd2exG_f1LDU7Z9Trhfap1zy-3n5an54n4c6-pAdOZfHm_qvF7t6ioEjrP97Trn5yVPpDBMx4tqVrZhexBLhMnQYU0g2eBw-xF-lw6tRLNLcdnyhtfp5cxBu3X4AO-NifdL68xADl_5eq2xDgikGtrYgDGMA1sHHTimCSLepiDDScRbgJ3Ul7DPE5XT7dDxqFVmvSIKWmvuGY3M7BtYj3tT7EmDBAOSr5i8/p.png?is_prewarmed=true";
const IMG_NEWYORK2_RED = "https://uc92f17a5455290f5ea256285280.previews.dropboxusercontent.com/p/thumb/AC7bzL3F1EdI7d57664djK64oYoGFxrcAqSZQ2rabLvxTRKVraXuuvXW1mFAIXCpcXQc5ab20mxdlAYgF5P6kZGJ050VkypIRJ-sRJKLRe5WRRoANEvvGHwRupzdThimh2z6KrI0sdK5YJZ3mgrFuzLCDTv_wz57N4Cw4VFvcAY6TwDs4ZFZhDAtnsqd-KqErjiag-o0SyX3LjlalpsxVwAFayGKf0FhbL16u_MaSq7JrZaYwMJwPFhP05XzrteyaCWKtLFiLGfuwSPl6Y4uxJc60RHMguTlMK-2-dLJxlN-7bVqYggzbzkUowoxK75rlLpICt-RZikahojp6axcfGEt6rG2ON8S82b60kd1EaWMdCgdkdeflTG7-V4gweenMn3ATs3SVE_li77jxThAG9q4/p.png?is_prewarmed=true";
const IMG_ROOSTER_1 = "https://uc19bd1b1f835e6da3b4ef35c630.previews.dropboxusercontent.com/p/thumb/AC4-aaoPhys71z5dUt3itBpkAkU_DOOOXZKl920N5WGijamwGBFg0WY-rm359IoD_M84ne366rGJj-1zq3lGJ_D4I4ndZFMfdJwql-GGjqq-Kn7nQwclF9-aiItvvAfYYEhOXS6bDh1QaB1CHD9JYhH2OGkSw-dE_ShGx-iAYM74pLGn0QDMBmuxKOZjQ--b44pawSiCznngdeO3cl7-l-NW5m5cyZBeHa0uV1CqMe7eCQIpF1H1pB-fHzEnYmV-n2t5OHo6BtN2-X7VoqN9-5qtBm-pFcmpoWbD3TvvWwl1ZIVGcIW90rK3cE7RHDGGuGD0X_Xfm5K9iStTssoH83D9TDII-M1eG1-A99Q_rdyHjeYZ6SprUyAtA0wli68WSGASa8kW94VZh-sMxcxaLRKr/p.png?is_prewarmed=true";
const IMG_SUPREME_1 = "https://uc6e441fcdaaf6c0a8c90c8051f3.previews.dropboxusercontent.com/p/thumb/AC4Yl0l3x0gEoUKpuWU89bsMuaA8eK9CNnaIb4VLa2Ml3RD8fMHl27ghbtMeUmZozNZ1R9AiMTs52iDyQMDIfYyKnm13ovaYaJQktCw6ambIFBTvBcLWL106jmNqCOJIan9_L-iy4te8yelvLk2r5BdPhNKMDMQsbaPwRAaUd0MLAmjZdxGGAW6Equ0MU66hrWwbVr_MioM1gWSJk03IfSFZd6ID64vnN8PaPCYOKGNyPpw-LF9ylS_z8aIaBdIJtvWfVCNYlLuOSSCCVEjRclU0dXnjkb_F01-OpkcnHiB1YWNlBDM-FQP1mlpklFj18Pzb5SGa2fZWQG90ij2subHErS_My7Jx2zZl2-6yas3xI6yjhZru32H6c8XML1YvDyZSz_ureRFWWAidSyBE22tE/p.png?is_prewarmed=true";
  
export default function CatalogSection() {
  const items1 = [
    { img: IMG_GORRA_AZUL },
    { img: IMG_GORRA_NEGRA },
    { img: IMG_TORONTO_BLUEJAY },
    { img: IMG_COCODRILE_RED },
    { img: IMG_COLUMBIA_1 },
    { img: IMG_NEWYORK1_WHITE },
    { img: IMG_NEWYORK2_RED },
    { img: IMG_ROOSTER_1 },
    { img: IMG_SUPREME_1 },
  ];

  const items2 = [
    { img: zamorLogodf },
    { img: zamorLogodf },
    { img: zamorLogodf },
    { img: zamorLogodf },
    { img: zamorLogodf },
    { img: zamorLogodf },
  ];

  return (
    <section id="catalogo" className="section">
      <h2>CATÁLOGO</h2>

      <h3 id="gorras" className="catalog-title">GORRAS</h3>
      <CatalogSlider items={items1} />

      <h3 id="bolsos" className="catalog-title">BOLSOS</h3>
      <CatalogSlider items={items2} />

      <p className="catalog-note">
        Para ver el catálogo completo, haz clic en "VER CATÁLOGO".
      </p>
    </section>
  );
}

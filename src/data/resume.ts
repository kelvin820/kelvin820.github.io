import { profile } from './profile';
export const resumes = {
  en: { ...profile, lang: 'en', labels: { profile: 'Profile', experience: 'Experience', education: 'Education', skills: 'Expertise' } },
  zh: {
    ...profile,
    lang: 'zh-Hant',
    role: '技術探索與研發夥伴合作',
    location: '台灣・台北',
    summary: '專注於技術探索與研發合作，具備電機與射頻工程背景。熟悉 Wi-Fi、藍牙、行動通訊及 VR 系統設計，涵蓋頭戴式顯示器（HMD）與人機介面（HMI）。透過內外部研發團隊合作，探索新興技術並推動通訊解決方案開發。',
    skills: ['技術探索', '研發夥伴合作', 'WLAN／Wi-Fi', '射頻工程', '嵌入式系統', '藍牙', '行動通訊', 'VR／HMD／HMI'],
    labels: { profile: '個人簡介', experience: '工作經歷', education: '學歷', skills: '專業領域' },
    experience: profile.experience.map((job, i) => ({
      ...job,
      title: ['總監｜技術探索與研發夥伴合作', '技術尋源與規劃', '技術經理', '資深電機／射頻工程師', '資深射頻工程師', '射頻設計工程師'][i],
      start: ['2020/01', '2018/01', '2014/09', '2009/04', '2006/08', '2004/08'][i],
      end: ['至今', '2020/01', '2018/01', '2014/09', '2009/04', '2006/08'][i],
      bullets: [
        [], [],
        ['探索 VR 生態系技術：HMD 機構、人體工學與工業設計、光學設計、超音波與 ToF 手部追蹤、眼球追蹤及電磁定位追蹤。', '探索自動駕駛技術：三支柱與端到端架構、LiDAR／雷達／相機／聲納感測、線控車輛、資料集、模擬器與資料視覺化。'],
        ['參與無線產品專案：Sony、HP、Dell 筆電，Sony 小筆電及平板、Smartbook、WLAN 與藍牙模組、60 GHz WiHD 模組，以及 NVIDIA LTE M.2 卡。'],
        ['行動電話專案：TI 平台 GSM，以及 EMP、Qualcomm 平台 WCDMA。'],
        ['行動電話專案：EMP 平台 WCDMA。'],
      ][i],
    })),
    education: { ...profile.education, school: '國立中正大學', degree: '電機工程碩士' },
  },
};

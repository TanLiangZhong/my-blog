module.exports = {
  title: '以梅佐酒的个人空间',
  description: '修身 齐家 治国 平天下',
  theme: 'reco',
  themeConfig: {
    type: 'blog',
    authorAvatar: '/avatar.png',
    logo: '/avatar.png',
    subSidebar: 'auto',
    author: '以梅佐酒',
    huawei: true,
    modePicker: false,
    startYear: '2016',
    friendLink: [
      // ...
    ],
    nav: [
      {text: 'Home', link: '/', icon: 'reco-home'},
      {text: 'About', link: '/about/', icon: 'reco-account'},
      {text: 'TimeLine', link: '/timeline/', icon: 'reco-date'},
      {text: 'GitHub', link: 'https://github.com/TanLiangZhong', icon: 'reco-github'},
    ],
    blogConfig: {
      category: {
        location: 2,     // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认文案 “分类”
      },
      tag: {
        location: 3,     // 在导航栏菜单中所占的位置，默认3
        text: 'Tag'      // 默认文案 “标签”
      },
      socialLinks: [     // 信息栏展示社交信息
        {icon: 'reco-github', link: 'https://github.com/TanLiangZhong'},
        {icon: 'reco-juejin', link: 'https://juejin.cn/user/26044010338920'},
      ]
    }
  }
}
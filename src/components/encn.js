export default (abbr) => {
  let name = {
    'bloodborne': '血源诅咒',
    'ff7r': '最终幻想 7 重制版',
    'tr2': '古墓丽影 2',
    'trials_rising': '特技摩托·崛起',
    'celeste': '蔚蓝',
    'supermetroid': '超级银河战士',
    'oot': '塞尔达传说·时之笛',
    'twwhd': '塞尔达传说·风之杖 HD',
    'darksouls3': '黑暗之魂 3',
    'sekiro': '只狼·影逝二度',
    'ahit': '时光帽',
    'pop_ww': '波斯王子·武者之心',
    'las': '塞尔达传说·织梦岛 2019',
    'factorio': '异星工厂',
    'titanfall_2': '泰坦陨落 2',
    'mk8dx': '马里奥赛车 8 豪华版',
    'na': '尼尔·机械纪元',
    'ori_de': '精灵与黑暗森林·终极版',
    'undertale': '传说之下',
    'pvz': '植物大战僵尸',
    'metroid_nes': '银河战士 FC',
    'psychonauts': '疯狂世界',
    'katana_zero': '武士刀零',
    'thewitness': '见证者',
    'smo': '超级马里奥·奥德赛',
    'd2016': '毁灭战士 2016',
    'yscelceta': '伊苏·塞尔塞塔的树海',
    'smm2': '超级马里奥创作家 2',
    'rhythm_heaven_fever': '大家的节奏天国',
    'ori_wotw': '精灵与萤火',
    'nioh_2': '仁王2',
    'braid': '时空幻境',
    'myfriendpedro': '我的朋友佩德罗',
    'the_vagrant': 'The Vagrant 流浪者',
    'dk64': '大金刚 64',
    'doom_eternal': 'DOOM 永恒',
    'jfo': '星球大战·绝地：陨落的武士团'
  }[abbr]

  return name ? name : abbr
}
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Adi Mutu',
    username: '@adimutu',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam in nunc pharetra, viverra ex a, ultricies lectus. Sed convallis nisi sed lacus vestibulum, a porttitor sapien mattis.',
    imgURLs: ['https://upload.wikimedia.org/wikipedia/commons/2/2b/Adrian_Mutu_2.jpg', 'https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg):focal(1581x582:1583x580)/origin-imgresizer.eurosport.com/2022/06/12/3391839-69317048-2560-1440.jpg'],
    comments: [{
      username:'Adrian Benga',
      content:'Se putea mai bine. S-a ratat mult, naspa meci'
    },
    {
      username: 'Gogo Straja',
      content:'prea golan adi mutu asta, nu si mai vede lungul nasului'
    },
    {
      username: 'Roby FCSB',
      content: 'Haide Steaua,e u tin cu steaua. sa bata steaua la toate scorurile'
    }]
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d73',
    event: true,
    title: 'Help Others',
    username: '@unicef',
    content: 'Lorem ipsum 4 dolor sit amet, consectetur adipiscing elit. Aliquam in nunc pharetra, viverra ex a, ultricies lectus. Sed convallis nisi sed lacus vestibulum, a porttitor sapien mattis.',
    imgURLs: ['https://static.vecteezy.com/system/resources/previews/002/774/528/original/teamwork-illustration-concept-worker-helping-each-other-for-business-group-free-vector.jpg'],
    comments: [{
      username:'Adrian Benga',
      content:'Se putea mai bine. S-a ratat mult, naspa meci'
    },
    {
      username: 'Gogo Straja',
      content:'prea golan adi mutu asta, nu si mai vede lungul nasului'
    },
    {
      username: 'Roby FCSB',
      content: 'Haide Steaua,e u tin cu steaua. sa bata steaua la toate scorurile'
    }]
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Adi Mutu 2',
    username: '@adimutu2',
    content: 'Lorem ipsum 2 dolor sit amet, consectetur adipiscing elit. Aliquam in nunc pharetra, viverra ex a, ultricies lectus. Sed convallis nisi sed lacus vestibulum, a porttitor sapien mattis.',
    comments: [{
      username:'Adrian Benga',
      content:'Se putea mai bine. S-a ratat mult, naspa meci'
    },
    {
      username: 'Gogo Straja',
      content:'prea golan adi mutu asta, nu si mai vede lungul nasului'
    },
    {
      username: 'Roby FCSB',
      content: 'Haide Steaua,e u tin cu steaua. sa bata steaua la toate scorurile'
    }]
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Adi Mutu 3',
    username: '@adimutu3',
    content: 'Lorem ipsum 3 dolor sit amet, consectetur adipiscing elit. Aliquam in nunc pharetra, viverra ex a, ultricies lectus. Sed convallis nisi sed lacus vestibulum, a porttitor sapien mattis.',
    comments: [{
      username:'Adrian Benga',
      content:'Se putea mai bine. S-a ratat mult, naspa meci'
    },
    {
      username: 'Gogo Straja',
      content:'prea golan adi mutu asta, nu si mai vede lungul nasului'
    },
    {
      username: 'Roby FCSB',
      content: 'Haide Steaua,e u tin cu steaua. sa bata steaua la toate scorurile'
    }]
  },
]

const Profiles = [
  {
    id: 1,
    username: '@adimutu',
    profileImgURL: 'https://s.hs-data.com/bilder/spieler/gross/7863.jpg',
    name: 'Adi Mutu',
    bio: 'Mutu started his career playing two years for Argeș Pitești and half a season for Dinamo București, before joining Inter Milan in Italy midway through the 1999–2000 Serie A.',
    followers: 296,
    events: 3,
  },
  {
    id: 2,
    username: '@unicef',
    profileImgURL: 'https://www.rador.ro/wp-content/uploads/2014/11/unicef-1.jpg',
    name: 'UNICEF',
    bio: 'Cu sediul în New York, UNICEF oferă asistență umanitară și pentru dezvoltarea copiilor și mamelor lor în țările în curs de dezvoltare. Agenție fondată prin voluntariat, UNICEF supraviețuiește prin fonduri guvernamentale și donații private.', 
    followers: 32145,
    events: 341,
  }
]

const Messages = [
  {
    id:1,
    mine:true,
    message:'Buna'
  },
  {
    id:2,
    mine:false,
    message:'Ce faci? Sunt Mutu'
  }
]

export { DATA , Profiles, Messages}
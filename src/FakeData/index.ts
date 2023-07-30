const idGen = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}
export const fakeData = {
  accordion: [
    {
      id: '1',
      title: 'Home',
      iconName: 'home',
      hasChildren: false,
      children: [],
    },
    {
      id: '2',
      title: 'Shops',
      iconName: 'shopping-cart',
      hasChildren: true,
      children: [
        {
          id: '1',
          title: 'Shop 1',
          group: 'shop',
          shop_id: idGen(),
          hasChildren: false,
          children: [],
        },
        {
          id: '2',
          title: 'Shop 2',
          group: 'shop',
          shop_id: idGen(),
          hasChildren: false,
          children: [],
        },
        {
          id: '3',
          title: 'Shop 3',
          group: 'shop',
          shop_id: idGen(),
          hasChildren: false,
          children: [],
        },
        {
          id: '4',
          title: 'Shop 4',
          group: 'shop',
          shop_id: idGen(),
          hasChildren: false,
          children: [],
        },
      ],
    },
    {
      id: '3',
      title: 'Account',
      iconName: 'user',
      hasChildren: true,
      children: [
        {
          id: '1',
          title: 'Profile',
          hasChildren: false,
          children: [],
        },
        {
          id: '2',
          title: 'My Orders',
          hasChildren: false,
          children: [],
        },
        {
          id: '3',
          title: 'My Profile',
          hasChildren: false,
          children: [],
        },
        {
          id: '4',
          title: 'Addresses',
          hasChildren: false,
          children: [],
        },
        {
          id: '5',
          title: 'Notification',
          hasChildren: false,
          children: [],
        },
      ],
    },
    {
      id: '4',
      title: 'Payment',
      iconName: 'credit-card',
      hasChildren: true,
      children: [
        {
          id: '1',
          title: 'Payment Method',
          hasChildren: false,
          children: [],
        },
        {
          id: '2',
          title: 'Payment Error',
          hasChildren: false,
          children: [],
        },
        {
          id: '3',
          title: 'Payment Completed',
          hasChildren: false,
          children: [],
        },
      ],
    },
    {
      id: '5',
      title: 'Authentication',
      iconName: 'lock',
      hasChildren: true,
      children: [
        {
          id: '1',
          title: 'PhoneRegister',
          hasChildren: false,
          children: [],
        },
        {
          id: '2',
          title: 'Sign Up',
          hasChildren: false,
          children: [],
        },
        {
          id: '3',
          title: 'Verification',
          hasChildren: false,
          children: [],
        },
        {
          id: '4',
          title: 'Change Password',
          hasChildren: false,
          children: [],
        },
        {
          id: '5',
          title: 'Splash',
          hasChildren: false,
          children: [],
        },
        {
          id: '6',
          title: 'Splash 2',
          hasChildren: false,
          children: [],
        },
      ],
    },
    {
      id: '6',
      title: 'Customer Reviews',
      iconName: 'star',
      hasChildren: true,
      children: [
        {
          id: '1',
          title: 'Ratings & Reviews',
          hasChildren: false,
          children: [],
        },
        {
          id: '2',
          title: 'Write a Review',
          hasChildren: false,
          children: [],
        },
      ],
    },
    {
      id: '7',
      title: 'About Us',
      iconName: 'smile',
      hasChildren: false,
    },
    {
      id: '8',
      title: 'Contact Us',
      iconName: 'headphones',
      hasChildren: false,
    },
  ],
  homeScreen: {
    slides: [
      {
        id: 1,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/01.webp',
      },
      {
        id: 2,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/02.webp',
      },
      {
        id: 3,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/03.webp',
      },
      {
        id: 4,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/04.webp',
      },
      {
        id: 5,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/05.webp',
      },
      {
        id: 6,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/banner-sliders/06.webp',
      },
    ],
    advantages: [
      {
        id: 1,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTUlEQVR4nO2Yu09UQRSH14iriSwYY6FUhs5eE61I7EwkIJUF/wCgobHXDrfWQhNaCkKl/4KRh8FH46ug8AFGEiwQozGazxw4mwxwHzNzZ93RzJfc5s6Z85vfnjNz791aLZFIJBKJRCKRKAPoBu4BG/wdvgD3gaO1kLCTtBPcDW1kQxOfDZo4X++86q2HTrxN0KSd0KQdSTuhSTLiz39XEeAT5XwGZoEzVkk7ZMSFLWAwViOjFrH9wAON/w5cKEzajgUXLM5JEzgITOu0d8DxyklDkKcJ1IEmsFbSZg+BAzEbaTrsmRsxG1nVocsFcy8Bv4Gfu/ZLZEa2sZg/tRPJe+CE0+SQ5GliuRagC3ik4XNOk2MyIgCngR86ZeCfNSIYR/JMbEY+6NBVyzwXNX4lNiO38ONXbEa61EyrMtZEZcSHZCQEqSJVWws4AkwCT4Bvei0B14HD3uLlOlvAAnBN3owrGQH6gBcFB8Zz4FRVIxY6zyTGy4j82kbyl8AQ0NBrGHhtiNR9jTjoPN2rY2tEWkd4BfRmjPcaIuMVjLjoTOQZWcv7fgbmdWyoYFFXNOaxpYlzRrsMeugsGPdG9d6q7VdZo0Cgh3A0LHQ2M+ZNtfqzaXyduQpI2V2QP83vADeBjx46m0a8rPl26f40Sj5cEDPi0loBdOZ9BOT8Rjda1iY8BrzVmDEPDz464z4CdX1OCG90w/XoNWIk33cstklnGTjkK9JniGQhz5CTviYcdJZdH7xZInIgSPkX9bWh9eowUaUSFjpfZe9JO5VV4g+MEIjIjWTIbgAAAABJRU5ErkJggg==',
        text: 'Free Delivery',
        color: '#0D6EFD',
      },
      {
        id: 2,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA10lEQVR4nO3ZsRGCUBCE4SsDsSQsB7QAbQt7Eg0w+p3n3IwOPtHA4B7ul15yNwsEi5mIiIi8AjZAD1yI5+y7NZ+OOFCO/VwSyQi0wMqCAVZA5zuSTQY4+rC14ICt79rnhun5SyoLDqh81yE3vLNC8G7fxR1SGtMhwZgSCca+/goEhQ5ZQiL8+jnWIQ96R6JBX61gUCLBoESCQYkUlMjgs3DF3BSw9l1PuWHqVJPOggN2cwVd48PRm7zaggFqP+Lqu+bL7FQMU3qJPUmmf6pQy/utICIi8q9uYdJqXVSS4jUAAAAASUVORK5CYII=',
        text: 'Secure Payment',
        color: '#723DA6',
      },
      {
        id: 3,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAByklEQVR4nO2ZS07DMBRFLbV8Jm2ZwkYYsIiWLiAzGBQW0nUl4idVzKBlAwwZtFPQQRavUtTEIXFfwJF8JEtR6xvf61cnTmpMJBKJ7APQBxJgBSzluG+6BNAD7ihiP+uZrsDP7Fve5TiRY0tiOlCFbKcCSUm4LVmQ1aFoNM0blaCpK2gICzpras5Rnf+7EDiq0G9rAlQBjoEHLRMlk3Fvx9B1XT7w3KcKDasz13VdHPQc+AS+gItgz0/5TSxUsqogncL8FsQEDjFIVyvSFUxFkN3recikOuX7Y/D1E4O0BLEiggkEfP3EIC1BrIhgAgFfPzFISxArIphAoK4f187XBAJ1n9ubBAGOgGt5B/Uhzb64uAIOa5hqrMd3K+8KApwBT7ixL+9OK87rpcf3F1ImtLMFPMpXL8AYGEibyB86WzOFmd1Hz75BHLwCoxLNKGemFb3xCFL12Duu0F3WCOKrTxsHcQyykRMOKvoMpc9GW68GsK5hxP48LGttvRq5hTqp6DOVPvfaejWAWxlk6VisJ8Cb9Jlp69WQy+ezDLSShTmUNs2ZWAAH2npV5Ia2NVPGosYN0VuviszsjWwxNtLsFmNWZyb31UdMB/gGWQfynCUuH5UAAAAASUVORK5CYII=',
        text: 'Free Returns',
        color: '#FF2C2C',
      },
      {
        id: 4,
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADSUlEQVR4nO2az0tVQRTHJ/yRGkQ/KJeV+Q9E9ks3QpBFuwiCaNOPRZQREfRDN7mwp7YoaFebFtW2ny4igiKhWphaQVAiRdbCihAqzFd+4vTO803P+3zv+ubdd6/4BeHNzJ3v+Z47d+acmdGYOUwFUAM0A9eBPuALEAfG9fdz4BpwGFhlwgSgDNgNPMEfJoAeYHsYnGgCXlvifgB3gUNAA1ALLNC/Wq2Ttm7gp9XvGbC5GA6UAl36VgXDwBGg0gdHpfb5aI1QTLgLqz4lYDnwWI3Lt38KqMiDrwJoUS7BI2CZW9VTjS4Eev+Zgw/yqTjkXgcMKXc/sMgVt9ebe6iG3gDVBbBRrdyCB8B8UwAjF62RWOHcQMrOSp1zgguuyTcCfzQmrHFK7m1vrdr6LZ+cyxXqhb6hTiekudntsuZL/iuZBjvBO6DKicrc7FYB79X2LheET5XshBOF/myfVNs9+RKt1kA1VvC1PXPM+qUaZp6baXInuOVUoT8Nt1XDwXxIJIsVtDpV509Dq2q4mg+JpOKCLU7V+U9MBb0z6Vyuy18y/zkfWDI3dekX26iWTtk2mBms4TZiJmCQEJ6O7LEMWC8T2xqJet1DCEYCUW8B+OyhY1w11mXqdEBTgklYbf+VgwIZdChE6770Do3aMGF/VpkIQ+DIOdUqmhuTjSXAK33gzHQEYXHEJH63afGl+CAV27TibXJFiIgjZcCgVjVJxWUtnM6FICyOCHSLLLgkhQEtbIigI5u0ql8K37SwOFeCEDmyRKu+Gt2JYUfuCDlSqlXxWTUiA7NgjvTZq1ZLrgQhcqTVXrW2amEw6nGkxIrsbZGN7BHPteKTuZb10P6IZb9xYG+mjnXATT25QPcAyX3AcJBOCGQP5KFD9iM35DTSZIPeU6Sj3QQMvHV0+CEo1W3miB4ot8s+vqCqvXWUqG307PlsMc4OnIDElZ1gyEQZpM6eu02UAdxTR5pNVAHsUCdGgaVBGy/XheIT3hjR9mknLbAT+K59jgfnQUpAB7kh5nEfUgPsAe5bz10B5hXDkeS9eX2G9mRgy4ZR4FhRnEhzpMGnI/JfE3JDdQc4WrDr6TyjcdZPK3QgMdlj1sh4TfaOydR7DrMUfwEbaScFEF18jgAAAABJRU5ErkJggg==',
        text: '24/7 Support',
        color: '#21AD61',
      },
    ],
    trending: [
      {
        id: 1,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/01.webp',
        name: 'Denim Shirts',
      },
      {
        id: 2,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/02.webp',
        name: 'Casual Shirts',
      },
      {
        id: 3,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/03.webp',
        name: 'Women Tops',
      },
      {
        id: 4,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/04.webp',
        name: 'Women Shirts',
      },
      {
        id: 5,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/05.webp',
        name: 'Women Jeans',
      },
      {
        id: 6,
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending/06.webp',
        name: 'Nightwear',
      },
    ],
    trendingSecond: [
      {
        id: 1,
        name: 'Women Heels',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending-shoes/01.webp',
      },
      {
        id: 2,
        name: 'Sports Shoes',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending-shoes/02.webp',
      },
      {
        id: 3,
        name: 'Leather Shoes',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending-shoes/03.webp',
      },
      {
        id: 4,
        name: 'Sneakes',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/trending-shoes/04.webp',
      },
    ],
    brands: [
      {
        id: 1,
        name: 'amazon',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/01.webp',
      },
      {
        id: 2,
        name: 'canon',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/02.webp',
      },
      {
        id: 3,
        name: 'dji',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/03.webp',
      },
      {
        id: 4,
        name: 'samsung',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/04.webp',
      },
      {
        id: 5,
        name: 'motorola',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/05.webp',
      },
      {
        id: 6,
        name: 'sony',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/06.webp',
      },
      {
        id: 7,
        name: 'microsoft',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/07.webp',
      },
      {
        id: 8,
        name: 'puma',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/brands/08.webp',
      },
    ],
    accessories: [
      {
        id: 1,
        name: 'Women Caps',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/accessories/01.webp',
      },
      {
        id: 2,
        name: 'Men Belts',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/accessories/02.webp',
      },
      {
        id: 3,
        name: 'Ladies Purse',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/accessories/03.webp',
      },
      {
        id: 4,
        name: 'Headphones',
        image: 'https://codervent.com/mobile/synrok/demo/assets/images/accessories/04.webp',
      },
    ],
  },
  productInner: {
    id: '76cbc91b-59fb-4bf9-aef6-0f0db5bf1bf2',
    name: 'Орех',
    description: '',
    barcode: '',
    sku: '',
    price: 87,
    properties: {
      unit: [
        {
          name: 'Упаковка(40шт)',
          refId: '',
          unitId: 5,
          contents: '40',
        },
        {
          name: 'Штучная упаковка',
          refId: '',
          unitId: 1,
          contents: '1',
        },
      ],
    },
    color: '',
    width: 0,
    height: 0,
    weight: 0,
    discount: 0,
    discountStart: null,
    discountEnd: null,
    reward: 2.34,
    categories: [
      {
        id: '0619e987-7e39-45d6-ab57-8fb1e83345ec',
        name: {
          am: '',
          en: '',
          ru: 'Орехи',
        },
        sortOrder: 1,
        isActive: false,
        metaTagTitle: {
          am: '',
          en: '',
          ru: '',
        },
        metaTagDescription: {
          am: '',
          en: '',
          ru: '',
        },
        metaTagKeyword: {
          am: '',
          en: '',
          ru: '',
        },
      },
    ],
    supplier: {
      createdAt: '2022-12-13T06:52:58.210Z',
      updatedAt: '2023-06-30T04:23:06.403Z',
      id: '4970f8e8-19f1-4d4d-a692-b5993f1e8ff9',
      companyName: 'Мартин Урал',
      taxId: '65413843846',
      agreement: true,
      isVerified: true,
      supplierSettings: {
        id: '9c42fa82-0c9a-4718-b004-14477d241354',
        minOrderSum: 0,
        minDeliveryDays: 200,
        maxDeliveryDays: 1000,
        globalDiscount: 0,
        deliveryAddress: [
          {
            city: 'Pyt-Yakh',
            region: 'Khanty-Mansi Autonomous Okrug',
            country: 'Russia',
          },
        ],
        canOrder: 'all',
        canSeeProducts: 'all',
      },
      __address__: {
        createdAt: '2023-06-07T09:59:16.064Z',
        updatedAt: '2023-06-07T09:59:16.064Z',
        id: '0282d900-e868-4461-b668-aa9007db72a8',
        country: 'Russia',
        state: 'Tyumen Oblast',
        city: 'Tyumen',
        address_1: ' ',
        address_2: '30',
        postCode: '53432',
        phoneNumber1: '+79199489474',
        phoneNumber2: '+79199489474',
        gpsCoordinates: {
          latitude: '60.7273587',
          longitude: '72.8211905',
        },
      },
    },
    gallery: [
      {
        createdAt: '2023-06-26T06:00:02.194Z',
        updatedAt: '2023-06-26T06:00:02.194Z',
        id: '6a7cca87-b64b-4299-b460-60857e78cfc9',
        originalName: 'ÐÐ°ÑÐµÐ½ÑÐµ Ð¸Ð· Ð»ÐµÐ¿ÐµÑÑÐºÐ¾Ð² ÑÐ¾Ð·Ñ 380 Ð³. Ð¿Ð½Ð³.png',
        filename: '338c77f6-8799-4622-b2be-c27b4a7f4fc6.png',
        path: 'uploadedFiles/gallery/338c77f6-8799-4622-b2be-c27b4a7f4fc6.png',
        mimetype: 'image/png',
        size: 615012,
        order: 0,
      },
    ],
    views: 13,
    sales: 0,
    rating: 0,
    inStock: null,
    createdAt: '2023-07-03T12:36:54.713Z',
    updatedAt: '2023-07-03T13:11:25.793Z',
    isVisible: true,
    refId: null,
    status: 'approved',
    featured: [],
  },
  profile: [
    {
      id: '1',
      title: 'My Profile',
      iconName: 'user',
    },
    {
      id: '2',
      title: 'My Order',
      iconName: 'shopping-cart',
    },
    {
      id: '3',
      title: 'Addresses',
      iconName: 'map-pin',
    },
    {
      id: '4',
      title: 'Notification',
      iconName: 'bell',
    },
    {
      id: '5',
      title: 'Wishlist',
      iconName: 'heart',
    },
    {
      id: '6',
      title: 'Logout',
      iconName: 'log-out',
    },
  ],
  shopIds: [
    {
      id: 1,
      shopId: 'shop_id_1',
    },
    {
      id: 2,
      shopId: 'shop_id_2',
    },
    {
      id: 3,
      shopId: 'shop_id_3',
    },
    {
      id: 4,
      shopId: 'shop_id_4',
    },
    {
      id: 5,
      shopId: 'shop_id_5',
    },
    {
      id: 6,
      shopId: 'shop_id_6',
    },
  ],
}

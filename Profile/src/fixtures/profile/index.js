export const menuItems = [
  {
    title: 'services',
    icon: 'star.svg',
    divider: false,
    link: '/profile/services'
  },
  {
    title: 'documents',
    icon: 'folder_1.svg',
    divider: true,
    link: '/profile/documents'
  },
  {
    title: 'titlePayments',
    icon: 'payment.svg',
    divider: true,
    link: '/profile/payments'
  },
  {
    title: 'messages',
    icon: 'inbox_1.svg',
    divider: true,
    link: '/otherPages'
  },
  {
    title: 'notifications',
    icon: 'tasks.svg',
    divider: true,
    link: '/profile/notifications'
  },
  {
    title: 'settings',
    icon: 'settings.svg',
    divider: true,
    link: '/profile/settings'
  }
]

export const profileItems = {
  title: 'personalInformation',
  icon: 'bookmark.svg',
  arrow: 'arrow.svg',
  link: '/profile/information'
}

export const exit = {
  title: 'exit',
  icon: 'lock_1.svg',
  arrow: null,
  link: '/'
}

export const payments = [
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  },
  {
    name: 'operation_name_mortgage_on_bail',
    type: 'operation_type',
    sum: '400',
    image: 'circle-blue',
    arrow: null
  }
]

export const notificationsFill = [
  {
    date: '02.05.20',
    time: '15:45',
    message: 'notifications_message'
  },
  {
    date: '02.05.20',
    time: '15:45',
    message: 'notifications_message'
  },
  {
    date: '02.05.20',
    time: '15:45',
    message: 'notifications_message'
  },
  {
    date: '02.05.20',
    time: '15:45',
    message: 'notifications_message'
  }
]
export const servicesItems = [
  {
    name: 'mortgage_in_a_new_building',
    status: 'waiting',
    additionalInformation: [
      {
        title: 'Mortgage amount',
        sum: 4500000
      },
      {
        title: 'monthly_payment',
        sum: 80000
      },
      {
        title: 'interest_refund',
        sum: 69000
      }
    ]
  },
  {
    name: 'mortgage_in_a_new_building',
    status: 'waiting',
    additionalInformation: [
      {
        title: 'Mortgage amount',
        sum: 4500000
      },
      {
        title: 'monthly_payment',
        sum: 80000
      },
      {
        title: 'interest_refund',
        sum: 69000
      }
    ]
  }
]
export const statusService = [
  {
    title: 'waiting_docs',
    value: 'waiting'
  }
]

export const statusDocument = [
  {
    title: 'documents_status_check',
    value: 'check'
  },
  {
    title: 'documents_status_received',
    value: 'received'
  },
  {
    title: 'documents_status_rejected',
    value: 'rejected'
  },
  {
    title: null,
    value: 'noDocs'
  }
]

export const exampleDocuments = {
  mortgage: [
    {
      title: 'passport',
      status: 'rejected',
      imageSrc: require('@/assets/images/profile/passport.png'),
      value: 'passport'
    },
    {
      title: 'passport',
      status: 'received',
      imageSrc: require('@/assets/images/profile/passport.png'),
      value: 'registration'
    },
    {
      title: 'passport',
      status: 'noDocs',
      imageSrc: '',
      value: 'backPassport'
    },
    {
      title: 'passport',
      status: 'check',
      imageSrc: require('@/assets/images/profile/passport.png'),
      value: 'passport'
    }
  ],
  test: [
    {
      title: 'passport',
      status: 'rejected',
      imageSrc: require('@/assets/images/profile/passport.png'),
      value: 'passport'
    },
    {
      title: 'passport',
      status: 'received',
      imageSrc: require('@/assets/images/profile/passport.png'),
      value: 'registration'
    }
  ]
}
export const documentButton = [
  {
    title: 'documents_download',
    functionButton: 'documentDownload'
  },
  {
    title: 'documents_delete',
    functionButton: 'documentDelete'
  }
]

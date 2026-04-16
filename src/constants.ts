import { Fabric, Moodboard } from './types';

export const FABRICS: Fabric[] = [
  {
    id: '1',
    name: 'Hand-Woven Belgian Linen',
    price: 650.00,
    unit: 'yard',
    category: 'Linen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLyjf0Ovdu5t6UFnBnDySMNG-00sSN6zVQIrqAcH_Ipll20wulKpKf6B1v0x0IhnjuYHrTaDO7dKrJhLKVB0EOrc8FbfYEx7_QKN-E5ddsfP6mDiPyULQ9YbE9rlIIz1SmHusfgPfF4ceB8pndKp06JJ9ox0zmPrnDRmm8-LEU6rn1GIY4573tkcTX4VX0a87SvC-pEkPHruApASvaC7kxuKGEeFg0m25GWhlMxZCMgkQrP5fR_t_BsoyoaGi4o918KDKaxWl4gFwG',
    description: 'Our signature Belgian linen features a rich, organic texture with a soft hand-feel that only gets better with every wash. Perfect for the Ghanaian climate.',
    fiber: '100% Linen',
    weight: '250 GSM',
    width: '58 inches',
    colors: ['#E5D3B3', '#5C4033', '#708090'],
    care: 'Machine Wash Cold',
    opacity: 'Opaque',
    drape: 'Medium Structure',
    isPremium: true
  },
  {
    id: '2',
    name: 'Organic Heavyweight Linen',
    price: 380.00,
    unit: 'yard',
    category: 'Linen',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzQ1-ynMLrZwjjxqvL61y6VBY9Wxa8EdbujqHgz8E_qLhPlsVsKnRIwgHgSnKJSTmHuhPX6yO4UoqKGsexSw0AwEzhHGK1n_Y6rAvh3HGYO62lufFUMsiMSLr7HipPVMzbxQJl761AhCHqL5VmYKslpU-jaRXAK3Cig12IF6QK9eIzGg55IRMJRV5zvTl2W5JbGoiH_zBsZ5BJFxKKijCkW1nsSqinhulpH6yU-xctvfwDB055SEKZmm6H2rL8-_wRJeBFKhVk8z5b',
    description: 'Durable and breathable heavyweight linen.',
    fiber: '100% Organic Linen',
    weight: '350 GSM',
    width: '60 inches',
    colors: ['#E5D3B3', '#5C4033', '#708090'],
    care: 'Machine Wash Cold',
    opacity: 'Opaque',
    drape: 'Heavy'
  },
  {
    id: '3',
    name: 'Raw Silk Crepe',
    price: 610.00,
    unit: 'yard',
    category: 'Silk',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALeLK3szb4SYtnfe2csfFZZCKJq4YJYSqJLBocmsU8eTIXYP2f_6WYvm7Qlzy8jTdJ3DTbNFWFQLuv4piiFjpOr9NxG2eNhMZG77UIs4aVxQh9DJ8d2R0bUudPmi_HQ9Yd4cjBwII16SB14F1LkvgcyMEotTTj9gQPY7SxL_LRSSgFVdDqlk4fAianY9SrIyulFu6j-9McZwhZrRD_oP9xM6OcIWX39YIWojZD8-0Sv2KUf7uwzMx7FLBAhOZZ6UxVBnj-cjQnsR61',
    description: 'Luxurious raw silk with a beautiful drape.',
    fiber: '100% Silk',
    weight: '120 GSM',
    width: '45 inches',
    colors: ['#FFF5EE', '#F5F5DC', '#D2B48C'],
    care: 'Dry Clean Only',
    opacity: 'Semi-Opaque',
    drape: 'Soft'
  },
  {
    id: '4',
    name: 'Italian Merino Wool',
    price: 665.00,
    unit: 'yard',
    category: 'Wool',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCs8L7yvgHhOtexCi0VExvpLz8u6m8WdpFxoZl6JwW9kZ4Asyh-ljd-J1wtmiFDB8GVQtJXTy_3Ueke2RKCR-diypmqiadPCgle7Fr82f_eZZU97Vdvyb3MHRJAvEjoLANFevfn5a2zEDjaxxH1Wjl16esVN6GZvdJIo_afkdRLoiJ9QFHVrodNkJKNUD65IJeUB6EOFF5gMLTPMjUXGJ9t2cEI2i3DPfrLiPit3R43lQLeoS4owCC0v4ydpDq-mvU0xiwTAOr5Igrm',
    description: 'Fine Italian merino wool for premium tailoring.',
    fiber: '100% Merino Wool',
    weight: '280 GSM',
    width: '58 inches',
    colors: ['#36454F', '#483C32', '#2F4F4F'],
    care: 'Dry Clean Only',
    opacity: 'Opaque',
    drape: 'Structured'
  },
  {
    id: '5',
    name: 'Egyptian Cotton Poplin',
    price: 285.00,
    unit: 'yard',
    category: 'Cotton',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHc9Mc4EX984SSue1meclw8zRYWeNHmr31saJfJuqi8nAuGvaLxunSX0PzJWkmpFcJJ8sHNWEHWyqUPhOS8PgCBd3ZRFwjcMDeA_bP5mGby9LXkWyjeJ87HUrmhhSuh4vWKZrIM4iQIsbZaj3uYuBdyqt7dW2909kAfsxn0FHx9An4zax9Kmupnoswg72KOqkY5Uvfx8N1-N_2XMmdIjJkf5fn609EavjEU7bcGv6ba0cfwdhGDKpOnll08aHnjo7fVu5j83bM5_sj',
    description: 'Smooth and crisp Egyptian cotton poplin.',
    fiber: '100% Egyptian Cotton',
    weight: '110 GSM',
    width: '60 inches',
    colors: ['#FFFFFF', '#000080', '#FFDAB9'],
    care: 'Machine Wash Warm',
    opacity: 'Semi-Opaque',
    drape: 'Crisp'
  },
  {
    id: '6',
    name: 'Premium Royal Velvet',
    price: 870.00,
    unit: 'yard',
    category: 'Velvet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc52YCibLwJPEXjKfuE2-nS2TB01wNgHc2J5JM26pevRZRtPN8ekViJdKJ34DipkjUP7eK8gLCSX3GGSwKyEtfQeC2Al1Fg1R7xHmYzf8taRHy6nLfT614JPG0FHtBFy_pcPo8CMrIWsBb2u4oNupb1X0tQpD1LfTVtgkGq6yuq0ac8J8CIpc0N5I-hDnlPLCrtGv6MPk41_pTSoo3jFsEIvhAZAiuaIi5C2YRYXyDRhJRhtKIJf3Hvw6UK2R8Nze6TVEACC5Oun78',
    description: 'Rich, heavy velvet with a deep luster.',
    fiber: '100% Silk Velvet',
    weight: '400 GSM',
    width: '54 inches',
    colors: ['#043927', '#4B0082', '#800000'],
    care: 'Dry Clean Only',
    opacity: 'Opaque',
    drape: 'Heavy'
  }
];

export const MOODBOARDS: Moodboard[] = [
  {
    id: '1',
    name: 'Summer Capsule',
    modified: '2d ago',
    itemCount: 12,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAOgyYkvYa5kDn3ykZ5jxQaPnV6ch6MkgJJIZswh8N-5K7soOaYg9N-zO-Llpvs5HnbMng7d0PKf5X1CU7iydCxY22XMXojcmNgZUvms9RqalGkKDielSsjKQpkWKSvLbl44HB9oFbZCIyBgmfnfxZurlplYtPW1QjVLMUu1TNI70Qp0Du9LWvmjrpeY-vjMv6iREtWTKGsguwWGcFSPL_O1GGVOmv7Dg3kdiY_XW0pH8Pzi7Ao-l9mbB_Pz0iLMOIngFVndsjNCS6l',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBwSmwubjwIwRgucK0qj_O1u_8KLzdnrn0WPDyewXfJGPUHq0B6QEoKr8i50BazWXsU4PwE7nVM9G0rvKhFZaojNfqMXuph-mvhSZafRUBrZtfISRBmnOKp8UpSPAKTiDQfFl7JXVzjJF8Gra7kmDidzyqQfXxcIsRtfIJNAdecE82kXmHVd8WLSGKEmVHPRsqiniiBfEYAtspqQSVUeFu_FPVhC0D_DoKNfeLQPshiv6X8ifsS9p2qvABESS1_kpurKnVb8wvXQpFQ',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAeAgmXpMmeq6d889FOe6gpeIxGfDX_VS7gTw5AhoXoH6IW-s6SD3gGEEiOqMCEsN2tzQgvaxFNrURfGbaQ742ybFASu9i9I6wpuoDyGYv3N9VqUOfAWBSnn3yV0iH2i7h0Siuurf0cShhFV79Zi2wtVd08k5U6XCAB-vo-qrmZaImNaSJo9tciosGiJ33JYEP280F8S4r7F3sayk6_Qp-6a6FJamPdcDiRN9jIVw8ePoRABnN6N0NEkx-q2H5sJEMluQMXKv1Gziny'
    ]
  },
  {
    id: '2',
    name: 'Home Upholstery',
    modified: '5h ago',
    itemCount: 4,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuALI9lC76A7xTOTaVDE0THAJZ6ztxzRmd_PP41tI2i1RTPBQ18U6Fetnnbw-gX7EWwX33csjWjtcyAER86Zf4njGNc1pYYsZj0P9NRbVgswIrTDqQ_bnEOu4z4bN5N9zRvJ-GCmxXuZfL659cZNaBTYtXrodw5XTeXUwXJDDHZFoDRVh7y-gt8Fdkav12AaA7GrwGj1IFVR5FFIQToGYz_Pd9dRPYt-FonLWga3ngPLL2Ix0BJKJC91ZfuI3iC_2le7kCCLBqnQtIic'
    ],
    isShared: true
  }
];

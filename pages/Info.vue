<script setup lang="ts">
import {
    format,
    differenceInCalendarMonths,
    differenceInCalendarYears,
} from 'date-fns'

import { useAsyncData } from "#app"
import { View } from "~/types/view"
import {Event, Info} from "~/types/info"

function formatDate(start: string, end?: string): string {
    const startDate = new Date(start)
    const startDateFormatted = format(startDate, "MMMM yyyy")

    if (!end) {
        return startDateFormatted
    }

    const endDate = new Date(end)

    if (differenceInCalendarMonths(startDate, endDate) === 0) {
        return startDateFormatted
    }

    const endDateFormatted = format(endDate, "MMMM yyyy")

    if (differenceInCalendarYears(startDate, endDate) === 0) {
        return `${format(startDate, "MMMM")} - ${endDateFormatted}`
    }

    return `${startDateFormatted} - ${endDateFormatted}`
}

function isEventInPast(event: Event): boolean {
    if (!event.endDate) {
        return differenceInCalendarMonths(Date.now(), new Date(event.startDate)) > 0
    }

    return differenceInCalendarMonths(Date.now(), new Date(event.endDate)) > 0
}

function sortEvents(events: Event[]): { pastEvents: Event[], futureEvents: Event[] } {
    const sorter = (a: Event, b: Event): number => {
        const eventA = new Date(a.endDate ? a.endDate : a.startDate)
        const eventB = new Date(b.endDate ? b.endDate : b.startDate)

        return differenceInCalendarMonths(eventB, eventA)
    }

    const {
        pastEvents,
        futureEvents,
    } = events.reduce((sorted, event) => {
        isEventInPast(event) ? sorted.pastEvents.push(event) : sorted.futureEvents.push(event)
        return sorted
    }, {
        pastEvents: new Array<Event>(),
        futureEvents: new Array<Event>(),
    })

    return {
        pastEvents: pastEvents.sort(sorter),
        futureEvents: futureEvents.sort(sorter),
    }
}

const { isDesktop } = useDevice();
const { find, findOne } = useStrapi()

// const { data: views } = await useAsyncData('views', () =>
//     find<View>('views', {
//         sort: 'rank',
//         populate: { images: { populate: '*' } }
//     }), {
//     transform: (i) => i.data
// });

const views = {
  value: [
    {
      attributes: {
        url: 'just-a-thought-away',
        title: 'Just A Thought Away',
        images: [
          {
            id: 0,
            title: '',
            description: '',
            year: '',
            image: {
              data: {
                attributes: {
                  url: 'https://res.cloudinary.com/djheukdry/image/upload/v1698178582/406_A0477_cd43191e71.jpg',
                  width: 1728,
                  height: 1152,
                  hash: 'string',
                  ext: 'jpg',
                  formats: {
                    thumbnail: {
                      url: 'https://res.cloudinary.com/djheukdry/image/upload/v1698178582/406_A0477_cd43191e71.jpg',
                      width: 1728,
                      height: 1152,
                      hash: 'string',
                      ext: 'jpg',
                    }
                  }
                }
              }
            }
          }
        ]
      }
    }
  ]
};

useState('views', () => views);

// const { data: info } = await useAsyncData('info', () =>
//     findOne<Info>('info', {
//         populate: {
//             exhibitions: { populate: '*' },
//             awards: { populate: '*' },
//             collections: { populate: '*' },
//         }
//     }), {
//     transform: (i) => i.data.attributes
// });

const info = {
  bio: 'Lives and works between Amsterdam, the Netherlands and London, UK, and holds an MA in Painting from the Royal College of Art.',
  awards: [
    {
      name: 'Leverhulme Arts Scholarship 2022 (Royal College of Art)',
    }
  ],
  collections: [
    {
      name: 'Vladimir Gogoljev, Belgrade, Serbia - Amsterdam, Netherlands (Honorary Consulate of the Republic of Serbia in the Kingdom of the Netherlands)',
    },
    {
      name: 'Valentina Salmeri-Bijzet, Amsterdam, Netherlands (Féminin Pluriel, Rijksmuseum Fund)',
    }
  ],
  value: {
    exhibitions: [
      {
        name: 'Linger in Silence',
        location: 'Willesden Gallery, London, United Kingdom',
        startDate: '2023-09-01',
        endDate: '2023-11-01',
      },
      {
        name: 'The Path of Excess',
        location: 'Safe-house 1, Peckham, London, United Kingdom',
        startDate: '2023-10-01',
        endDate: '2023-10-31',
      },
      {
        name: 'Drive Through',
        location: 'Lempa Taverna, Cyprus School of Art',
        startDate: '2023-10-01',
        endDate: '2023-10-31',
      },
      {
        name: 'Connecting the Future',
        location: 'Josilda da Conceição Gallery, Amsterdam, Netherlands',
        startDate: '2023-07-01',
        endDate: '2023-08-31',
      },
      {
        name: 'Living Life Along Paths',
        location: 'Eyecandies x Kai Yuan Gallery, Shanghai, China',
        startDate: '2023-07-01',
        endDate: '2023-08-31',
      },
      {
        name: 'Overflow',
        location: 'Galleria Objets, London, United Kingdom',
        startDate: '2023-07-01',
        endDate: '2023-07-31',
      },
      {
        name: 'Overflow',
        location: 'Galleria Objets, London, United Kingdom',
        startDate: '2023-07-01',
        endDate: '2023-07-31',
      },
      {
        name: 'Connecting the Future',
        location: 'The Dots Gallery, Belgrade, Serbia',
        startDate: '2023-02-01',
        endDate: '2023-05-31',
      },
      {
        name: 'Moving Through',
        location: 'Safe-house 2, Peckham, London, United Kingdom',
        startDate: '2023-03-01',
        endDate: '2023-04-01',
      },
      {
        name: 'The Headless Way',
        location: '29 Marylebone Lane, London',
        startDate: '2023-04-01',
        endDate: '2023-04-02',
      },
      {
        name: 'Third Floor',
        location: 'Royal College of Art, Woo Building, London, United Kingdom',
        startDate: '2023-02-01',
        endDate: '2023-02-02',
      },
      {
        name: 'Sensorial Historiography',
        location: 'Laurel Project Space, Amsterdam, Netherlands',
        startDate: '2021-09-01',
        endDate: '2021-09-02',
      },
      {
        name: 'Summer Work',
        location: 'Bologna.cc, Amsterdam, Netherlands',
        startDate: '2021-08-01',
        endDate: '2021-08-30',
      },
      {
        name: 'Yes, Again!',
        location: 'Patty Morgan Showroom, Amsterdam, Netherlands',
        startDate: '2020-12-01',
        endDate: '2021-01-30',
      },
      {
        name: 'Separation, Alignment, Cohesion',
        location: 'Laurel Project Space, Amsterdam, Netherlands',
        startDate: '2020-07-01',
        endDate: '2020-07-30',
      },
      {
        name: 'Facade Exhibition',
        location: 'Paradiso, Amsterdam, Netherlands',
        startDate: '2020-04-01',
        endDate: '2020-04-30',
      },
      {
        name: 'Baking Normal',
        location: 'Laurel Project Space, Amsterdam, Netherlands',
        startDate: '2020-01-01',
        endDate: '2020-01-30',
      },
      {
        name: 'Ornamental Rest',
        location: 'Laurel Project Space',
        startDate: '2019-10-01',
        endDate: '2019-10-30',
      },
      {
        name: 'Pruning',
        location: 'Laurel Project Space, Amsterdam, Netherlands',
        startDate: '2019-07-01',
        endDate: '2019-07-30',
      },
      {
        name: 'ADORN',
        location: 'Open House, Amsterdam, Netherlands',
        startDate: '2019-04-01',
        endDate: '2019-04-30',
      },
    ],
  }
}

const {
    pastEvents,
    futureEvents,
} = sortEvents(info.value?.exhibitions || [])

const pageTitle = 'Juliet Aaltonen - Info'
const pageDescription = 'Juliet Aaltonen (b. 1992) London, UK, lives and works between Amsterdam, the Netherlands and London, UK, and is currently pursuing an MA in Painting at the Royal College of Art.'
const pageUrl = 'https://julietaaltonen.com/info/'

useHead({
    title: pageTitle,
    meta: [
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: pageDescription },
        { property: 'og:url', content: pageUrl },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        {
            name: 'description',
            content: pageDescription
        },
    ],
    htmlAttrs: { lang: 'en' },
    link: [{ rel: 'canonical', href: pageUrl }],
});
</script>

<template>
    <Header />
    <div class="w-screen flex flex-row justify-center pb-16">
        <div :class="isDesktop ? 'w-2/3' : 'w-10/12'">
            <div v-if=info.bio class="whitespace-pre-line leading-relaxed font-light text-sm pb-3" v-html=$mdRenderer.render(info.bio) />
            <div v-if=futureEvents.length class="leading-relaxed font-light text-sm pb-6">
                <div class="font-semibold pb-3"><h3>Upcoming and current shows</h3></div>
                <ul>
                    <li class="pb-3" v-for="event in futureEvents">
                        <p>
                            <span class="italic">{{ event.name }}</span>, {{ event.location }}
                            ({{ formatDate(event.startDate, event.endDate) }})</p>
                    </li>
                </ul>
            </div>
            <div v-if=pastEvents.length class="leading-relaxed font-light text-sm pb-6">
                <div class="font-semibold pb-3"><h3>Past shows</h3></div>
                <ul>
                    <li class="pb-3" v-for="event in pastEvents">
                        <p>
                            <span class="italic">{{ event.name }}</span>, {{ event.location }}
                            ({{ formatDate(event.startDate, event.endDate) }})</p>
                    </li>
                </ul>
            </div>
            <div v-if=info.awards?.length class="leading-relaxed font-light text-sm pb-6">
                <div class="font-semibold pb-3"><h3>Awards</h3></div>
                <ul>
                    <li class="pb-3" v-for="award in info.awards"><p>{{ award.name }}</p></li>
                </ul>
            </div>
            <div v-if=info.collections?.length class="leading-relaxed font-light text-sm pb-6">
                <div class="font-semibold pb-3">
                    <h3>Collections</h3>
                </div>
                <ul>
                    <li class="pb-2" v-for="collection in info.collections"><p>{{ collection.name }}</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

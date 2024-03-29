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

const { data: views } = await useAsyncData('views', () =>
    find<View>('views', {
        sort: 'rank',
        populate: { images: { populate: '*' } }
    }), {
    transform: (i) => i.data
});

useState('views', () => views);

const { data: info } = await useAsyncData('info', () =>
    findOne<Info>('info', {
        populate: {
            exhibitions: { populate: '*' },
            awards: { populate: '*' },
            collections: { populate: '*' },
        }
    }), {
    transform: (i) => i.data.attributes
});

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

<script lang="ts" setup>
interface Props {
    step: number
    title: string
    paragraph: string
}

const props = defineProps<Props>()
const imageSrc = (await import(`@/assets/images/how-it-works-0${props.step}.png`)).default
</script>

<template>
    <div class="flex flex-col items-center text-center">
        <img :src="imageSrc" :alt="`Step 0${step}`" class="shadow-[0_100px_80px_rgba(0,0,0,0.07),0_41.7776px_33.4221px_rgba(0,0,0,0.0503198),0_22.3363px_17.869px_rgba(0,0,0,0.0417275),0_12.5216px_10.0172px_rgba(0,0,0,0.035),0_6.6501px_5.32008px_rgba(0,0,0,0.0282725),0_2.76726px_2.21381px_rgba(0,0,0,0.0196802)] mb-14">

        <Badge class="uppercase mb-5">Step 0{{ step }}</Badge>

        <Heading :level="6" class="text-white mb-2">
            {{ title }}
        </Heading>

        <p>{{ paragraph }}</p>
    </div>
</template>

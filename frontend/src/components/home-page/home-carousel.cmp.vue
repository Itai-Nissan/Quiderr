<template>
  <div>
    <h1 class="categories-list-header">Popular professional services</h1>
    <br />
    <vueper-slides
      fixed-height="345px"
      class="no-shadow"
      :visible-slides="5"
      slide-multiple
      :bullets="false"
      :arrowsOutside="false"
      :gap="3"
      :slide-ratio="1 / 4"
      :dragging-distance="200"
      :breakpoints="{
        1240: { visibleSlides: 4, slideMultiple: 4 },
        1060: { visibleSlides: 3, slideMultiple: 3 },
        800: { visibleSlides: 2, slideMultiple: 2 },
        600: { visibleSlides: 1, slideMultiple: 1 },
      }"
    >
      <vueper-slide
        @click="moveTo(slide.title)"
        class="card-vuper"
        v-for="slide in categorieSlides"
        :key="slide"
        :image="slide.image"
      >
        <template #content>
          <div class="categorie-card-text">
            <h4>{{ slide.preTitle }}</h4>
            <h1>{{ slide.title }}</h1>
          </div>
        </template>
      </vueper-slide>
    </vueper-slides>
  </div>
</template>

<script>
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
import { utilService } from '../../services/util-service'
export default {
  components: { VueperSlides, VueperSlide },
  data() {
    return {
      categorieSlides: [
        {
          image: this.getImgUrl('categories/1.png'),
          title: 'Logo Design',
          preTitle: 'Build your brand',
        },
        {
          image: this.getImgUrl('categories/2.png'),
          title: 'WorldPress',
          preTitle: 'Customize your site',
        },
        {
          image: this.getImgUrl('categories/3.png'),
          title: 'Voice Over',
          preTitle: 'SHare your message',
        },
        {
          image: this.getImgUrl('categories/4.png'),
          title: 'Video Explainer',
          preTitle: 'Engage your audience',
        },
        {
          image: this.getImgUrl('categories/5.png'),
          title: 'Social Media',
          preTitle: 'Reach more customers',
        },
        {
          image: this.getImgUrl('categories/6.png'),
          title: 'SEO',
          preTitle: 'Unlock growth online',
        },
        {
          image: this.getImgUrl('categories/7.png'),
          title: 'Illustration',
          preTitle: 'Color your dreams',
        },
        {
          image: this.getImgUrl('categories/8.png'),
          title: 'Translation',
          preTitle: 'Go global',
        },
        {
          image: this.getImgUrl('categories/9.png'),
          title: 'Data entry',
          preTitle: 'Learn your business',
        },
        {
          image: this.getImgUrl('categories/10.png'),
          title: 'Book Covers',
          preTitle: 'Showcase your story',
        },
      ],
    }
  },
  methods: {
    moveTo(title) {
      this.$router.push(`/explore?search=${title.toLowerCase()}`)
    },
    getImgUrl(file) {
      const imgUrl = new URL(`../../assets/imgs/${file}`, import.meta.url)
      return imgUrl
    },
  },
}
</script>

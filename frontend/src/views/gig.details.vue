<template>
  <section
    v-if="gig"
    class="gig-details-main-container"
  >
    <div class="gig-details-wrapper">
      <div class="purchase-container">
        <deatils-order-box :gig="gig" />
      </div>
      <div class="gig-details-main-info">
        <details-header :gig="gig" />
        <div>
          <vueper-slides
            ref="vueperslides1"
            :touchable="false"
            fade
            :autoplay="false"
            :bullets="false"
            fixed-height="400px"
            @slide="
              $refs.vueperslides2.goToSlide($event.currentSlide.index, {
                emit: false,
              })
            "
          >
            <vueper-slide
              v-for="(img, i) in gig.imgUrl"
              :key="i"
              :image="img"
            />
          </vueper-slides>
          <vueper-slides
            ref="vueperslides2"
            class="no-shadow thumbnails"
            :visible-slides="gig.imgUrl.length"
            fixed-height="70px"
            :bullets="false"
            :touchable="false"
            :gap="2.5"
            :arrows="false"
            @slide="
              $refs.vueperslides1.goToSlide($event.currentSlide.index, {
                emit: false,
              })
            "
          >
            <vueper-slide
              v-for="(img, i) in gig.imgUrl"
              :key="i"
              :image="img"
              @click="$refs.vueperslides2.goToSlide(i)"
            />
          </vueper-slides>
          <div class="gig-details-about-gig">
            <details-about-gig :gig="gig" />
          </div>
          <div class="gig-details-about-seller">
            <details-about-seller :gig="gig" />
          </div>
          <div class="gig-details-reviews-section">
            <details-reviews-section :gig="gig" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import detailsHeader from '../components/gig-details/details-header.cmp.vue'
import deatilsOrderBox from '../components/gig-details/deatils-order-box.cmp.vue'
import detailsAboutGig from '../components/gig-details/details-about-gig.cmp.vue'
import detailsAboutSeller from '../components/gig-details/details-about-seller.cmp.vue'
import detailsReviewsSection from '../components/gig-details/details-reviews-section.cmp.vue'

import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  name: 'GigDetails',
  components: {
    detailsHeader,
    deatilsOrderBox,
    detailsAboutGig,
    detailsAboutSeller,
    detailsReviewsSection,
    VueperSlides,
    VueperSlide,
  },
  data() {
    return {
      gig: null,
      gigId: this.$route.params.id,
    }
  },
  computed: {
    gigOwner() {
      return this.gig.owner.fullname
    },
    gigTitle() {
      return this.gig.title
    },
    gigImg() {
      return this.gig.imgUrl
    },
  },
  created() {
    this.getGigById(this.gigId)
  },
  methods: {
    getImgUrl(file) {
      const fileStr = file.substring(file.indexOf('/images'))
      console.log(fileStr)
      const imgUrl = new URL(`../assets${fileStr}`, import.meta.url).href
      return imgUrl
    },
    async getGigById(gigId) {
      this.gig = await this.$store.dispatch({
        type: 'getGigById',
        gigId,
      })
    },
  },
}
</script>

<style>
.thumbnails {
  margin: auto;
  max-width: 300px;
  margin-top: 7px;
}

.thumbnails .vueperslide {
  box-sizing: border-box;
  border: 1px solid #fff;
  transition: 0.3s ease-in-out;
  opacity: 0.4;
  cursor: pointer;
}

.thumbnails .vueperslide--active {
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  opacity: 1;
  /* border-color: #000; */
}
</style>

<template>
  <section v-if="gig && seller" class="details-reviews-pack">
    <header>
      <h3>19 Reviews</h3>
      <!-- <h3>{{ gig.owner.reviews.length }} Reviews</h3> -->
      <div class="stars">
        <el-rate v-model="ownerRate" disabled show-score text-color="#ff9900" />
      </div>
    </header>
    <div class="reviews-container">
      <!-- Stats table -->
      <div>
        <!-- Stats bar -->
        <section class="reviews-bar">
          <!-- <div v-for="(rate, idx) in getReviewsRate" :key="idx" class="bar"> -->
          <div class="bar">
            <div class="star-filter">
              <!-- <span class="rater">{{ rate.rate }} </span> -->
              <!-- <span>{{ rate.rate === 1 ? ' Star' : ' Stars' }}</span> -->
              <span>5 Stars</span>
            </div>
            <div class="progress-bar">
              <span class="back" />
              <!-- <span class="front" :style="{ width: getWidth(rate.counter) }"> -->
              <span class="front" style="width: 97%" />
            </div>
            <span class="star-number">(9)</span>
          </div>
          <div class="bar">
            <div class="star-filter">
              <!-- <span class="rater">{{ rate.rate }} </span> -->
              <!-- <span>{{ rate.rate === 1 ? ' Star' : ' Stars' }}</span> -->
              <span>4 Stars</span>
            </div>
            <div class="progress-bar">
              <span class="back" />
              <!-- <span class="front" :style="{ width: getWidth(rate.counter) }"> -->
              <span class="front" style="width: 78%" />
            </div>
            <span class="star-number">(7)</span>
          </div>
          <div class="bar">
            <div class="star-filter">
              <!-- <span class="rater">{{ rate.rate }} </span> -->
              <!-- <span>{{ rate.rate === 1 ? ' Star' : ' Stars' }}</span> -->
              <span>3 Stars</span>
            </div>
            <div class="progress-bar">
              <span class="back" />
              <!-- <span class="front" :style="{ width: getWidth(rate.counter) }"> -->
              <span class="front" style="width: 20%" />
            </div>
            <span class="star-number">(3)</span>
          </div>
          <div class="bar">
            <div class="star-filter">
              <!-- <span class="rater">{{ rate.rate }} </span> -->
              <!-- <span>{{ rate.rate === 1 ? ' Star' : ' Stars' }}</span> -->
              <span>2 Stars</span>
            </div>
            <div class="progress-bar">
              <span class="back" />
              <!-- <span class="front" :style="{ width: getWidth(rate.counter) }"> -->
              <span class="front" style="width: 0%" />
            </div>
            <span class="star-number">(0)</span>
          </div>
          <div class="bar">
            <div class="star-filter">
              <!-- <span class="rater">{{ rate.rate }} </span> -->
              <!-- <span>{{ rate.rate === 1 ? ' Star' : ' Stars' }}</span> -->
              <span>1 Star</span>
            </div>
            <div class="progress-bar">
              <span class="back" />
              <!-- <span class="front" :style="{ width: getWidth(rate.counter) }"> -->
              <span class="front" style="width: 0%" />
            </div>
            <span class="star-number">(0)</span>
          </div>
        </section>
        <!-- Stats rating -->
        <section class="rate-breakdown">
          <h3>Rating Breakdown</h3>
          <ul>
            <li>
              Seller communication level
              <div class="orca-rating color-yellow tbody-6">
                <div class="stars">
                  <span class="star">★</span>
                </div>
                <b class="rating-score">4.9</b>
              </div>
            </li>
            <li>
              Recommend to a friend
              <div class="orca-rating color-yellow tbody-6">
                <div class="stars">
                  <div class="stars">
                    <span class="star">★</span>
                  </div>
                </div>
                <b class="rating-score">4.6</b>
              </div>
            </li>
            <li>
              Service as described
              <div class="orca-rating color-yellow tbody-6">
                <div class="stars">
                  <div class="stars">
                    <span class="star">★</span>
                  </div>
                </div>
                <b class="rating-score">4.8</b>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <!-- List of Reviews -->
      <section class="reviews-list">
        <div v-for="review in gig.owner.reviews" :key="review.by._id" class="review-container">
          <img class="reviewer-img" :src="review.by.imgUrl">
          <div class="reviewer-info">
            <span>{{ review.by.fullname }}</span>
          </div>
          <div class="reviewer-location">
            <img class="country-flag" :src="review.by.flag">
            <span class="country-name">{{ review.by.country }}</span>
          </div>
          <div class="review-txt">
            <p>{{ review.by.review }}</p>
          </div>
          <div class="review-at">
            <p>{{ review.by.reviewedAt }}</p>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'DetailsAboutGig',
  props: { gig: Object },
  data() {
    return {
      seller: null,
      ownerRate: ref(Number.parseFloat(this.gig.owner.rate).toFixed(1)),
    }
  },
  computed: {
    getReviewsRate() {
      const counter = {}
      const rating = []
      const bars = [5, 4, 3, 2, 1]

      this.seller.reviews.forEach((review) => {
        bars.forEach((bar) => {
          if (review.rate === bar) {
            counter[review.rate]
              ? counter[review.rate]++
              : (counter[review.rate] = 1)
          } else {
            counter[bar] = 0
          }
        })
      })

      Object.keys(counter).forEach((key) => {
        const obj = {
          rate: key,
          counter: counter[key],
        }
        rating.push(obj)
      })
      return rating.sort((a, b) => b.rate - a.rate)
    },
  },
  async created() {
    this.getSeller()
  },
  methods: {
    getWidth(rate) {
      return `${rate * 10}%`
    },
    async getSeller() {
      const userId = this.gig.owner._id
      this.seller = await this.$store.dispatch({ type: 'getUserById', userId })
    },
  },
}
</script>

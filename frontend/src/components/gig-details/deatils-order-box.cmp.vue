<template>
  <section class="purchase-container">
    <div class="purchase-wrapper">
      <header class="purchase-title">
        <span class="txt">Order Delivery</span>
        <span class="price">${{ gigPrice }}</span>
      </header>
      <section>
        <div class="purchase-info">
          <!-- Delivery time (using fiverr svg) -->
          <div class="delivery-wrapper">
            <span class="XQskgrQ delivery-icon" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
                <path d="M9 4H7v5h5V7H9V4z" />
              </svg>
            </span>
            <b class="delivery">{{ gig.delivery }} &nbsp;Days Delivery</b>
          </div>
          <!-- Delivery revisions (using fiverr svg) -->
          <div class="revisions-wrapper">
            <span class="XQskgrQ revisions-icon" aria-hidden="true">
              <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M4.50001 11.4999C6.40001 13.3999 9.60001 13.3999 11.5 11.4999C12.2 10.7999 12.7 9.7999 12.9 8.7999L14.9 9.0999C14.7 10.5999 14 11.8999 13 12.8999C10.3 15.5999 5.90001 15.5999 3.10001 12.8999L0.900012 15.0999L0.200012 8.6999L6.60001 9.3999L4.50001 11.4999Z" />
                <path
                  d="M15.8 7.2999L9.40001 6.5999L11.5 4.4999C9.60001 2.5999 6.40001 2.5999 4.50001 4.4999C3.80001 5.1999 3.30001 6.1999 3.10001 7.1999L1.10001 6.8999C1.30001 5.3999 2.00001 4.0999 3.00001 3.0999C4.40001 1.6999 6.10001 1.0999 7.90001 1.0999C9.70001 1.0999 11.5 1.7999 12.8 3.0999L15 0.899902L15.8 7.2999Z" />
              </svg>
            </span>
            <b class="revisions">Unlimited Revisions</b>
          </div>
        </div>
        <div class="purchase-categories">
          <ul>
            <li v-for="tag in gig.tags" :key="tag">
              <el-icon><Select /></el-icon>
              <span> {{ tag.charAt(0).toUpperCase() + tag.slice(1) }} </span>
            </li>
          </ul>
        </div>
      </section>
      <div>
        <button class="purchase-btn" @click="onMoveToOrder">
          Continue
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DetailsOrderBox',
  components: {},
  props: {
    gig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    gigPrice() {
      return this.gig.price.toFixed(2)
    },
  },
  methods: {
    onMoveToOrder() {
      this.$router.push(`/order/${this.gig._id}`)
    },
  },
}
</script>

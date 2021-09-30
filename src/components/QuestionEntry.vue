<template>
    <div class="entry">
        <!-- <h1>{{ getCurrentQuestion.title }}</h1>
        <h2>{{ getCurrentQuestion.description }}</h2> -->
        <!-- <h1>Question {{ questionNum }}</h1>
        <h2>number: {{getCount}}</h2> -->

        

        <input type="url" name="date" v-model="record.date" class="formElement" placeholder="mm/dd" @change="onChange($event)">

        <select v-model="record.transactionType" class="formElement" @change="onChange($event)">
          <option disabled value="">Please select one</option>
          <option value="revenue">Revenue</option>
          <option value="deferred">Deferred</option>
          <option value="cash">Cash</option>
          <option value="receivable">Receivable</option>
          <option value="system-credit">System Credit</option>
        </select>

        <input type="number" v-model="record.amount" class="formElement" placeholder="amount" name="amount" min="0" @change="onChange($event)">

        <label class="switch">
          <input type="checkbox" id="togBtn" class="formElement" v-model="record.isCredit" @change="onChange($event)">
          <div class="slider round">
            <!--ADDED HTML -->
            <span class="cr">CR</span>
            <span class="dr">DR</span>
            <!--END-->
          </div>
        </label>

    </div>
</template>
  

<script>

function formatEntry(data){
  let output = {
    when: data.date,
    type: data.transactionType
  }
  data.isCredit ? output.Cr = data.amount : output.Dr = data.amount
  return output

}
export default {
  data: function() {
    return {
      record:{
        date: '',
        transactionType: '',
        amount: '',
        isCredit: ''
      }
    };
  },
  props: {
    color: String,
    label: {
      type: String,
      required: true,
      default: "none",
      validator: function (value) {
        // should return true, if the prop is valid
        return !!value;
      },
    },
  },
  methods: {
    onChange(event) {
      console.log(event)
      this.$emit('updateAnswer', formatEntry(this.record))
    }
  }
};
</script>

<style scoped>
input, select{
    height: 34px;
    margin: 10px;
    padding: 2px;
    border: 1px solid;
}

/*------ SLIDER ---------*/
.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;

}

.switch input {display:none;}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ca2222;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2ab934;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.cr
{
  display: none;
}

.cr, .dr
{
  color: white;
  position: absolute;
  transform: translate(-50%,-50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

input:checked+ .slider .cr
{display: block;}

input:checked + .slider .dr
{display: none;}

/*--------- END --------*/

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;}
</style>
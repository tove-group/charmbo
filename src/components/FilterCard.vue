<template>
    <div class="filter-card-container">
        <v-card class="filter-card-card mx-auto pa-4 rounded-xl"
            color="#F2F2F2">
            <div class="pa-4">
                <div class="d-flex justify-space-between">
                    <div>年齡範圍</div>
                    <div>{{ageString}}</div>
                </div>
                <v-range-slider
                    hide-details
                    v-model="filterParam.ageRange"
                    max="100"
                    min="18"
                ></v-range-slider>
                <div class="d-flex justify-space-between">
                    <div>18</div>
                    <div>100+
                    </div>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="pa-4">
                <div class="d-flex justify-space-between">
                    <div>距離</div>
                    <div>{{distanceString}}</div>
                </div>
                <v-range-slider
                    hide-details
                    v-model="filterParam.distanceRange"
                    max="160"
                    min="0"
                ></v-range-slider>
                <div class="d-flex justify-space-between">
                    <div>0</div>
                    <div>160+</div>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="pa-4">我想認識
            <v-radio-group
                v-model="filterParam.sex"
                row
                class=""
                >
                <v-radio
                    label="所有人"
                    :value="-1"
                ></v-radio>
                <v-radio
                    label="男生"
                    :value="1"
                ></v-radio>
                <v-radio
                    label="女生"
                    :value="0"
                ></v-radio>
            </v-radio-group>
            </div>
        </v-card>
    </div>
</template>

<script>
export default {
    props:{
        filterParam:{
            type:Object,
            default: function(){
                return {
                    ageRange:[0,100],
                    distanceRange:[0,160],
                    sex:-1
                }
            }
        }
    },
    data(){
        return {
            // ageRange:[0,100],
            // distanceRange:[0,160],
            // sex:0
        }
    },
    computed:{
        ageString(){
            return this.filterParam.ageRange[0] + ' - ' + this.filterParam.ageRange[1] + (this.filterParam.ageRange[1] == 100? '+' : '');
        },
        distanceString(){
            return this.filterParam.distanceRange[0] + ' - ' + this.filterParam.distanceRange[1] + (this.filterParam.distanceRange[1] == 160? '+' : '') + 'km';
        },
    }
}
</script>

<style>
.filter-card-container{
    width:100%;
}
.filter-card-card{
    width:90%;
}
</style>
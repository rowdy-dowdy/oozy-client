<template>
  <div @click.prevent="$router.push('/')" class="fixed top-0 left-0 w-full h-screen bg-black/30 overflow-y-auto">
    <div @click.stop="" class="relative w-full md:max-w-[600px] min-h-[610px] bg-white mx-auto md:my-12 px-8 md:rounded-xl">
      <div class="absolute md:hidden right-8 top-4 rounded-md px-4 py-1 bg-red-500 text-white">
        <button @click.prevent.stop="$router.push('/')">Đóng</button>
      </div>
      <div class="w-full">
        <div class="w-12 mx-auto py-3">
          <img src="../assets/logo.png" alt="logo" class="w-full">
        </div>
      </div>
      <form action="post" class="pb-6">
        <div class="min-h-[430px]">
          <div v-if="nextPage == 0" class="next-0">
            <div class="py-4">
              <h3 class="text-xl font-semibold tracking-wide">Tạo tài khoản của bạn</h3>
            </div>
            <div class="mt-2">
              <div class="relative bg-white border border-gray-300 rounded px-2 h-[58px]
                focus-within:border-violet-500 focus-within:border-2
                flex items-end"
                :class="{'input-error': !nameIsCorrect}">
                <input type="text" id="name" autofocus v-model="name"
                  placeholder=" "
                  maxlength="50"
                  autocomplete="new-password"
                  class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
                <label for="name"
                  class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
                  peer-focus:text-xs peer-focus:text-violet-600
                  peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
                  transition-all duration-100 ease truncate w-full"
                >Tên</label>
                <span class="absolute hidden peer-focus:inline right-2 top-2 text-sm text-gray-600">
                  {{ name.length }} / 50
                </span>
              </div>
              <div v-if="!nameIsCorrect" class="text-xs text-red-500 px-2 pt-1">Tên bạn là gì?</div>
            </div>
            <div class="mt-4">
              <div class="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <div class="flex-1 relative bg-white border border-gray-300 rounded px-2 h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end"
                  :class="{'input-error': !passwordIsCorrect}">
                  <input type="password" id="password" autofocus v-model="password"
                    placeholder=" "
                    autocomplete="new-password"
                    class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
                  <label for="password"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
                    peer-focus:text-xs peer-focus:text-violet-600
                    peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
                    transition-all duration-100 ease truncate w-full"
                  >Mật khẩu</label>
                </div>
                <div class="flex-1 relative bg-white border border-gray-300 rounded px-2 h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end"
                  :class="{'input-error': !rePasswordIsCorrect}">
                  <input type="password" id="rePassword" autofocus v-model="rePassword"
                    placeholder=" "
                    autocomplete="new-password"
                    class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
                  <label for="name"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
                    peer-focus:text-xs peer-focus:text-violet-600
                    peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
                    transition-all duration-100 ease truncate w-full"
                  >Nhập lại mật khẩu</label>
                </div>
              </div>
              <div v-if="!passwordIsCorrect || !rePasswordIsCorrect" class="text-xs text-red-500 px-2 pt-1">{{ passwordTextError }}</div>
            </div>
            <div class="mt-4">
              <template v-if="!useEmail">
                <div class="relative bg-white border border-gray-300 rounded px-2 h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end"
                  :class="{'input-error': !phoneIsCorrect}">
                  <input type="tel" id="phone" v-model="phone"
                    placeholder=" "
                    autocomplete="new-password"
                    class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
                  <label for="phone"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
                    peer-focus:text-xs peer-focus:text-violet-600
                    peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
                    transition-all duration-100 ease truncate w-full"
                  >Điện thoại</label>
                </div>
                <div v-if="!phoneIsCorrect" class="text-xs text-red-500 px-2 pt-1">{{ phoneTextError }}</div>
              </template>
              <template v-else>
                <div class="relative bg-white border border-gray-300 rounded px-2 h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end"
                  :class="{'input-error': !emailIsCorrect}">
                  <input type="text" id="email" v-model="email"
                    placeholder=" "
                    autocomplete="new-password"
                    class="peer w-full block bg-transparent focus:outline-none pt-4 pb-1.5 z-10">
                  <label for="email"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1 peer-focus:pt-1
                    peer-focus:text-xs peer-focus:text-violet-600
                    peer-placeholder-shown:pt-4 peer-placeholder-shown:text-base
                    transition-all duration-100 ease truncate w-full"
                  >Email</label>
                </div>
                <div v-if="!emailIsCorrect" class="text-xs text-red-500 px-2 pt-1">{{ emailTextError }}</div>
              </template>
            </div>
            <div class="mt-4 py-4">
              <a href="#"
                v-if="!useEmail"
                tabindex="-1"
                @click.prevent="useEmail = !useEmail"
                class="text-violet-600 hover:underline text-[14px]">Sử dụng email</a>
              <a href="#"
                v-else
                tabindex="-1"
                @click.prevent="useEmail = !useEmail"
                class="text-violet-600 hover:underline text-[14px]">Sử dụng só điện thoại</a>
            </div>
            <div class="mt-4 text-[14px]">
              <p class="font-bold">Ngày sinh</p>
              <p class="text-muted mt-1">Điều này sẽ không được hiển thị công khai.  Xác nhận tuổi của bạn, ngay cả khi tài khoản này dành cho doanh nghiệp, thú cưng hoặc thứ gì khác.</p>
            </div>
            <div class="mt-4 flex space-x-3">
              <div class="flex-auto">
                <div class="relative bg-white border border-gray-300 rounded h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end">
                  <select v-model="monthSelected" id="month"
                    class="peer w-full block bg-transparent focus:outline-none
                    pb-1.5 relative z-10 pt-8 cursor-pointer">
                    <!-- <option value="" disabled></option> -->
                    <option v-for="(v,i) in dataMonth" :value="i">{{ v }}</option>
                  </select>
                  <label for="month-1"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1
                    peer-focus:text-violet-600 transition-all duration-100 ease truncate w-full"
                  >Tháng</label>
                </div>
              </div>
              <div class="flex-auto">
                <div class="relative bg-white border border-gray-300 rounded h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end">
                  <select id="day" v-model="daySelected"
                    class="peer w-full block bg-transparent focus:outline-none
                    pb-1.5 relative z-10 pt-8 cursor-pointer">
                    <option value="" disabled selected hidden></option>
                    <option v-for="i in dataDate" :key="i" :value="i">{{ dataDate[i-1] }}</option>
                  </select>
                  <label for="day"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1
                    peer-focus:text-violet-600 transition-all duration-100 ease truncate w-full"
                  >Ngày</label>
                </div>
              </div>
              <div class="flex-auto">
                <div class="relative bg-white border border-gray-300 rounded h-[58px]
                  focus-within:border-violet-500 focus-within:border-2
                  flex items-end">
                  <select id="year" v-model="yearSelected"
                    class="peer w-full block bg-transparent focus:outline-none
                    pb-1.5 relative z-10 pt-8 cursor-pointer">
                    <option value="" disabled selected></option>
                    <option v-for="i in dataYear" :value="i">{{ i }}</option>
                  </select>
                  <label for="year"
                    class="absolute top-0 left-2 text-gray-600 text-xs pt-1
                    peer-focus:text-violet-600 transition-all duration-100 ease truncate w-full"
                  >Năm</label>
                </div>
              </div>
            </div>
          </div>

          <div v-if="nextPage == 1" class="next-1">
            <button 
              @click.prevent="nextPage = 0"
              class="flex p-1 rounded-full hover:bg-gray-200 absolute
              top-3 left-3 text-3xl"><i class='bx bx-x'></i></button>

            <div class="py-4">
              <h3 class="text-xl font-semibold tracking-wide">Tùy chỉnh trải nghiệm của bạn</h3>
            </div>

            <div class="w-full mt-6">
              <h4 class="text-lg font-semibold tracking-wide">Theo dõi nơi bạn thấy nội dung Oozy trên web</h4>
              <div class="flex mt-2 items-center">
                <div class="flex-grow text-sm">
                  Oozy sử dụng dữ liệu để cá nhân hóa trải nghiệm của bạn. Lịch sử duyệt web sẽ không được lưu với tên, email hay số điện thoại của bạn.
                </div>
                <div class="flex-none">
                  <div class="flex rounded-full p-2 hover:bg-gray-200">
                    <input type="checkbox" id="checkbox1" class="sr-only peer">
                    <label for="checkbox1" class="w-5 h-5 bg-white border-2 
                      border-gray-600 block rounded cursor-pointer text-white
                      peer-checked:bg-violet-600 peer-checked:border-violet-600">
                      <span class="text-center inline-block translate-y-[-1px]">
                        <i class='bx bx-check' ></i>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <p class="mt-8 text-sm">
              Để biết thêm chi tiết về những cài đặt này, truy cập 
              <a href="" class="text-violet-600 hover:underline">Trung tâm trợ giúp.</a>
            </p>
          </div>
        </div>

        <div class="mt-12">
          <button @click.prevent="submit" :disabled="!isSubmit || loadingSubmit"
            class="w-full h-[52px] flex rounded-full bg-violet-600
            text-center px-2 py-3.5 text-white font-bold justify-center
            disabled:bg-violet-300 disabled:cursor-default items-center"
          >
            <span v-if="!loadingSubmit">
              <span v-if="nextPage < 1">Tiếp theo</span>
              <span v-else>Đồng ý</span>
            </span>
            <span v-else class="text-[2rem] inline-flex"><i class='bx bx-loader-alt bx-spin' ></i></span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import router from '../router'

export default defineComponent({
  setup() {
    const store = useStore()

    const dataMonth = ['','Tháng một','Tháng hai','Tháng ba','Tháng bốn','Tháng năm','Tháng sáu','Tháng bảy','Tháng tám','Tháng chín','Tháng mười','Tháng mười một','Tháng mười hai']

    // variable check
    var nameIsCorrect = ref<boolean>(true)
    var passwordIsCorrect = ref<boolean>(true)
    var rePasswordIsCorrect = ref<boolean>(true)
    var phoneIsCorrect = ref<boolean>(true)
    var emailIsCorrect = ref<boolean>(true)

    var firstCheckName:boolean = false
    var firstCheckPassword:boolean = false
    var firstCheckRePassword:boolean = false
    var firstCheckPhone:boolean = false
    var firstCheckEmail:boolean = false

    var dayIsCorrect = ref<boolean>(false)
    var monthIsCorrect = ref<boolean>(false)
    var yearIsCorrect = ref<boolean>(false)


    //
    // check date
    //

    var tempDataDate:number[] = []
    for(let i = 1; i<=31; i++) {
      tempDataDate.push(i)
    }

    var dataDate = ref<number[]>(tempDataDate)

    var maxDayInMonth:number[] = [0,31,28,31,30,31,30,31,31,30,31,30,31]

    var monthSelected = ref<string>("")
    var daySelected = ref<string>("")
    var yearSelected = ref<string>("")

    var birthday = computed(() => new Date(monthSelected.value + '/' + daySelected.value + '/' + yearSelected.value))

    var tempDateYear:number[] = []
    for(let i = (new Date().getFullYear()); i >= 1900; i--) {
      tempDateYear.push(i)
    }
    
    var dataYear = ref<number[]>(tempDateYear)

    const checkdate = (day) => {
      if (monthSelected.value == '' || monthSelected.value == undefined) {
        if (day <= 31) return true
      } else {
        if (day <= maxDayInMonth[monthSelected.value])
          return true
      }
      return false
    }

    watch(
      (yearSelected),
      (newYearSelected) => {
        // change day
        if ( (newYearSelected % 4 == 0 && newYearSelected % 100 != 0) 
          || newYearSelected % 400 == 0 )
            maxDayInMonth[2] = 29;
        else
          maxDayInMonth[2] = 28;
        
        if (monthSelected.value == 2)
          dataDate.value = tempDataDate.filter(checkdate)

        // check submit
        if (newYearSelected != '' && newYearSelected != undefined) {
          yearIsCorrect.value = true
        } else {
          yearIsCorrect.value = false
        }
      }
    )

    watch(
      (monthSelected),
      (newMonthSelected) => {
        // change day
        dataDate.value = tempDataDate.filter(checkdate)

        if (daySelected.value > dataDate.value[dataDate.value.length-1])
          daySelected.value = ""

        // change year
        if (monthSelected.value == 2 && daySelected.value == 29) {
          dataYear.value = tempDateYear.filter((v) => {
            if ((v % 4 == 0 && v % 100 != 0) || v % 400 == 0)
              return true
            else
              return false
          })
        } else {
          dataYear.value = tempDateYear
        }

        // check submit
        if (newMonthSelected != '' && newMonthSelected != undefined) {
          monthIsCorrect.value = true
        } else {
          monthIsCorrect.value = false
        }
      }
    )

    watch(
      (daySelected),
      newDaySelected => {
        // change year
        if (monthSelected.value == 2 && newDaySelected == 29) {
          dataYear.value = tempDateYear.filter((v) => {
            if ((v % 4 == 0 && v % 100 != 0) || v % 400 == 0)
              return true
            else
              return false
          })
        } else {
          dataYear.value = tempDateYear
        }

        // check submit
        if (newDaySelected != '' && newDaySelected != undefined) {
          dayIsCorrect.value = true
        } else {
          dayIsCorrect.value = false
        }
      }
    )

    // check name, phone, email
    var name = ref<string>('')
    var password = ref<string>('')
    var rePassword = ref<string>('')
    var phone = ref<string>('')
    var email = ref<string>('')
    var useEmail = ref<boolean>(false)
    var emailTextError = ref<string>('Vui lòng nhập email hợp lệ')
    var phoneTextError = ref<string>('Vui lòng nhập số điện thoại hợp lệ')
    var passwordTextError = ref<string>('Vui lòng nhập mật khẩu hợp lệ')

    watch(
      (useEmail),
      v => {
        isSubmit.value = checkDataFormSubmit()
      }
    )

    watch(
      (name),
      (newName) => {
        firstCheckName = true
        
        if (newName == '' || newName.length < 6) {
          nameIsCorrect.value = false}
        else
          nameIsCorrect.value = true
      }
    )

    var regexPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    watch(
      [password,rePassword],
      ([pass,rePass]) => {
        if (pass != "")
          firstCheckPassword = true

        if (regexPassword.test(pass)) {
          passwordIsCorrect.value = true
        } else {
          passwordIsCorrect.value = false
          passwordTextError.value = 'Mật khẩu dài ít nhất 8 ký tự, bao gồm ít nhất 1 chữ in, 1 chữ thường, 1 số và 1 ký tự đặc biệt'
        }

        if (passwordIsCorrect.value) {
          if (rePass != "")
            firstCheckRePassword = true

          if (rePass == pass) {
            rePasswordIsCorrect.value = true
          } else {
            rePasswordIsCorrect.value = false
            passwordTextError.value = 'Mật khẩu nhập lại không đúng'
          }
        }

        isSubmit.value = checkDataFormSubmit()
      }
    )

    var myTimeoutPhone
    const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;
    const getUserByPhoneControl = store.getters['user/getUserByPhoneControl']

    watch(
      (phone),
      (newPhone) => {
        firstCheckPhone = true
        phoneIsCorrect.value = true
        clearTimeout(myTimeoutPhone)

        getUserByPhoneControl.abort()

        myTimeoutPhone = setTimeout(function(){
          if (regexPhone.test(newPhone)) {
            phoneIsCorrect.value = false
            phoneTextError.value = 'Đang kiểm tra số điện thoại...'

            setTimeout(async () => {
              try {
                let result = await getUserByPhoneControl.ready(newPhone)

                if (result == null) {
                  throw 'error'
                }

                phoneIsCorrect.value = false
                phoneTextError.value = 'Số điện thoại đã tồn tại'

              } catch (err) {
                phoneIsCorrect.value = true
              }
            }, 300);
          }
          else {
            phoneIsCorrect.value = false
            phoneTextError.value = 'Vui lòng nhập số điện thoại hợp lệ'
          }

          myTimeoutPhone = undefined
        },500)
      }
    )

    var myTimeoutEmail
    const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const getUserByEmailControl = store.getters['user/getUserByEmailControl']

    watch(
      (email),
      (newEmail) => {
        firstCheckEmail = true
        emailIsCorrect.value = true
        clearTimeout(myTimeoutEmail)
        
        getUserByEmailControl.abort()

        myTimeoutEmail = setTimeout(function(){
          if (regexEmail.test(newEmail)) {
            emailIsCorrect.value = false
            emailTextError.value = 'Đang kiểm tra email...'
            
            setTimeout(async () => {
              try {
                let result = await getUserByEmailControl.ready(newEmail)

                if (result == null) {
                  throw 'error'
                }

                emailIsCorrect.value = false
                emailTextError.value = 'Email đã tồn tại'

              } catch (err) {
                emailIsCorrect.value = true
              }
            }, 300);
          }
          else {
            emailIsCorrect.value = false
            emailTextError.value = 'Vui lòng nhập email hợp lệ'
          }

          myTimeoutEmail = undefined
        },500)
      }
    )

    // check submit form
    var isSubmit = ref<boolean>(false)
    var myTimeoutSubmit
    watch(
      [phoneIsCorrect, emailIsCorrect],
      () => {
        isSubmit.value = false
        clearTimeout(myTimeoutSubmit)

        myTimeoutSubmit = setTimeout(() => {
          isSubmit.value = checkDataFormSubmit()
        }, 600);
      }
    )

    watch(
      [nameIsCorrect, dayIsCorrect, monthIsCorrect, yearIsCorrect],
      () => {
        isSubmit.value = checkDataFormSubmit()
      }
    )

    function checkDataFormSubmit () {
      if (nextPage.value == 0) {
        if (firstCheckName && nameIsCorrect.value && dayIsCorrect.value && monthIsCorrect.value && yearIsCorrect.value && firstCheckPassword && passwordIsCorrect.value && firstCheckRePassword && rePasswordIsCorrect.value) {

          if (useEmail.value && firstCheckEmail && emailIsCorrect.value && myTimeoutEmail == undefined) {
            return true
          } 
          else if (!useEmail.value && firstCheckPhone && phoneIsCorrect.value && myTimeoutPhone == undefined) {
            return true
          } 
          else {
            return false
          }
        } else
          return false
      } 
      else if (nextPage.value == 1) {
        return true
      } 
      else
        return false
    }

    
    // SUBMIT FORM
    var loadingSubmit = ref<boolean>(false)
    const submit = async () => {
      if(!isSubmit.value) return
      
      loadingSubmit.value = true
      try {
        // first page
        if (nextPage.value == 0) {
          if (myTimeoutEmail == undefined && myTimeoutPhone == undefined)
            nextPage.value = 1;
        } else if (nextPage.value == 1) {

          let dataSignUp = {
            name : name.value,
            password: password.value,
            email : email.value,
            phone : phone.value,
            birthday : birthday.value
          }

          await store.dispatch('user/signup',dataSignUp)
          
          router.push('/home')
        }

      } catch (err) {
        console.log(err);
      } finally {
        loadingSubmit.value = false
      }
    }

    // next page
    var nextPage = ref<number>(0)

    watch(
      (nextPage),
      newV => {
        isSubmit.value = checkDataFormSubmit()
      }
    )


    return { dataMonth, dataDate, dataYear, monthSelected, useEmail, 
      daySelected, yearSelected, isSubmit, name, phone, email, nextPage,
      nameIsCorrect, phoneIsCorrect, emailIsCorrect, loadingSubmit, submit,
      emailTextError, phoneTextError, password, rePassword, passwordIsCorrect,
      rePasswordIsCorrect, passwordTextError }
  },
})
</script>


<style scoped>
  .input-error {
    @apply border-red-500;
  }
  .input-error label {
    @apply !text-red-500;
  }
</style>
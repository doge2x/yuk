@val @return(nullable)
external gmGetValue: string => option<'v> = "GM_getValue"
@val
external gmSetValue: (string, 'v) => unit = "GM_setValue"

module GMEntry = {
  module type T = {
    type val
    let name: string
    let init: option<val>
  }

  module Make = (T: T) => {
    let v = ref(
      lazy (
        switch gmGetValue(T.name) {
        | Some(cached) => Some(cached)
        | None => {
            gmSetValue(T.name, T.init)
            T.init
          }
        }
      ),
    )

    let get = () => v.contents->Lazy.force

    let set = (newVal: option<T.val>) => {
      v := newVal->Lazy.from_val
      gmSetValue(T.name, newVal)
    }
  }
}

module Option2 = {
  module type T = {
    type val
  }

  module Make = (T: T) => {
    let v: ref<option<T.val>> = ref(None)
    let get = () => v.contents
    let set = (newVal: option<T.val>) => v := newVal
  }
}

module Username = GMEntry.Make({
  type val = string
  let name = "username"
  let init = None
})

module Server = GMEntry.Make({
  type val = string
  let name = "server"
  let init = None
})

module SyncAnswers = GMEntry.Make({
  type val = bool
  let name = "sync_answers"
  let init = Some(true)
})

module NoLeaveCheck = GMEntry.Make({
  type val = bool
  let name = "no_leave_check"
  let init = Some(true)
})

module SortProblems = GMEntry.Make({
  type val = bool
  let name = "sort_problems"
  let init = Some(false)
})

module Token = Option2.Make({
  type val = string
})

module ExamId = Option2.Make({
  type val = int
})

module GM = {
  @module("./gm") @return(nullable)
  external getValue: string => option<'v> = "getValue"
  @module("./gm")
  external setValue: (string, 'v) => unit = "setValue"
}

module GMEntry = {
  module type T = {
    type val
    let name: string
    let init: option<val>
  }

  module Make = (T: T) => {
    let v = ref(
      lazy (
        switch GM.getValue(T.name) {
        | Some(cached) => Some(cached)
        | None => {
            GM.setValue(T.name, T.init)
            T.init
          }
        }
      ),
    )

    let get = () => v.contents->Lazy.force

    let set = (newVal: T.val) => {
      let newVal = newVal->Some
      v := newVal->Lazy.from_val
      GM.setValue(T.name, newVal)
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
    let set = (newVal: T.val) => v := Some(newVal)
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

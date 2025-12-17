(define-map simple-map
  uint
  bool
)

(define-constant ERR_ONE (err u1))
(define-constant ERR_TWO (err u2))
(define-constant err-three (err u3))

(define-non-fungible-token nft uint)

(define-non-fungible-token tuple-nft {
  a: uint,
  b: bool,
})

(define-fungible-token ft)

(define-public (set-in-map
    (key uint)
    (val bool)
  )
  (ok (map-set simple-map key val))
)

(define-data-var num-var uint u0)

(define-public (set-num (num uint))
  (ok (var-set num-var num))
)

(define-read-only (echo (val (string-ascii 33)))
  val
)

(define-read-only (echo-with-logs (val (string-ascii 33)))
  (begin
    (print val)
    val
  )
)

(define-read-only (ro-resp (return-err bool))
  (if return-err
    (err u100)
    (ok "asdf")
  )
)

(define-public (print-pub)
  (begin
    (print u32)
    (print { a: true })
    (print "hello")
    (ok true)
  )
)

(define-read-only (get-tup)
  {
    a: u1,
    bool-prop: true,
    tuple-prop: { sub-prop: "asdf" },
  }
)

(define-read-only (merge-tuple (i { min-height: uint }))
  (merge i { max-height: u100000 })
)

(define-public (print-err)
  (begin
    (print u100)
    (err u210)
  )
)

(define-read-only (get-tenure-info-test)
  (get-tenure-info? burnchain-header-hash u1)
)

(define-read-only (clarity-4-test)
  stacks-block-time
)

(define-public (complex-args
    (a uint)
    (b int)
    (c bool)
    (d principal)
    (f (buff 10))
    (g (string-ascii 10))
    (h (string-utf8 10))
    (i (optional uint))
    (j (list 10 uint))
    (k {
      a: uint,
      b: bool,
    })
    (l (response uint uint))
    (m (optional uint))
  )
  (ok true)
)

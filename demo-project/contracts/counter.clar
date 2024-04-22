;; The counter contract maintains a single global counter
;; variable. Users can change the counter by calling
;; `increment` and `decrement`.

;; The variable used to hold the global counter.
(define-data-var counter uint u1)

;; Map to track each sender's last increment
(define-map last-increment principal uint)

;; Get the current counter
(define-read-only (get-counter)
  (var-get counter)
)

;; Increment the counter. You cannot increment by more than 5.
;; 
;; @returns the new value of the counter
;; 
;; @param step; The interval to increase the counter by
(define-public (increment (step uint))
  (let (
    (new-val (+ step (var-get counter)))
  ) 
  ;; #[allow(unchecked_data)]
  (var-set counter new-val)
  (print { object: "counter", action: "incremented", value: new-val })
  (asserts! (<= step u5) (err u100))
  (map-set last-increment tx-sender step)
  (ok new-val))
)

;; Decrement the counter
;; 
;; @param step; The interval to increase the counter by
(define-public (decrement (step uint))
  (let (
    (new-val (- (var-get counter) step))
  ) 
  ;; #[allow(unchecked_data)]
  (var-set counter new-val)
  (print { object: "counter", action: "decremented", value: new-val })
  (ok new-val))
)

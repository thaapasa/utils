package fi.haapatalo.utils

sealed class Optional<T> {
    fun get(): T = when (this) {
        is Some -> value
        is None -> throw IllegalStateException("None.get() is not allowed")
    }
    infix fun or(x: T): T = when (this) {
        is Some -> value
        is None -> x
    }
    inline fun orGet(x: () -> T): T = when (this) {
        is Some -> value
        is None -> x()
    }
    fun orNull() = when (this) {
        is Some -> value
        is None -> null
    }
    inline fun <X> map(mapper: (T) -> X): Optional<X> = when (this) {
        is Some -> Some(mapper(value))
        is None -> this as Optional<X>
    }
    inline fun <X> flatMap(mapper: (T) -> Optional<X>): Optional<X> = when (this) {
        is Some -> mapper(value)
        is None -> this as Optional<X>
    }
    companion object {
        fun <T> of(t: T?): Optional<T> = when (t) {
            null -> None.of()
            else -> Some(t)
        }
    }
}

object None: Optional<Any>() {
    fun <T> of(): Optional<T> = this as Optional<T>
}
data class Some<T>(val value: T): Optional<T>()

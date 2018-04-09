package fi.haapatalo.utils

sealed class Optional<out T> {
    fun get(): T = when (this) {
        is Some -> value
        is None -> throw IllegalStateException("None.get() is not allowed")
    }
    fun orNull() = when (this) {
        is Some -> value
        is None -> null
    }
    inline fun <X> map(mapper: (T) -> X): Optional<X> = when (this) {
        is Some -> Some(mapper(value))
        is None -> this
    }
    inline fun <X> flatMap(mapper: (T) -> Optional<X>): Optional<X> = when (this) {
        is Some -> mapper(value)
        is None -> this
    }
    companion object {
        fun <T> of(t: T?): Optional<T> = when (t) {
            null -> None
            else -> Some(t)
        }
    }
}

object None: Optional<Nothing>()
data class Some<out T>(val value: T): Optional<T>()

infix fun <T> Optional<T>.or(x: T): T = when (this) {
    is Some -> value
    is None -> x
}

inline fun <T> Optional<T>.orGet(x: () -> T): T = when (this) {
    is Some -> value
    is None -> x()
}

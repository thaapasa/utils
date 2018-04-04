package fi.haapatalo.utils

sealed class Either<out L, out R> {
    fun isLeft(): Boolean = this is Left
    fun isRight(): Boolean = this is Right

    fun toLeft(): L = when (this) {
        is Left -> left
        is Right -> throw IllegalStateException("Right cannot be cast toLeft()")
    }
    fun toRight(): R = when (this) {
        is Left -> throw IllegalStateException("Left cannot be cast toRight()")
        is Right -> right
    }

    fun toLeftOpt(): L? = when (this) {
        is Left -> left
        is Right -> null
    }
    fun toRightOpt(): R? = when (this) {
        is Left -> null
        is Right -> right
    }

    inline fun <X> mapLeft(mapper: (L) -> X): Either<X, R> = when (this) {
        is Left -> Left(mapper(left))
        is Right -> this as Right<X, R>
    }
    inline fun <X> mapRight(mapper: (R) -> X): Either<L, X> = when (this) {
        is Left -> this as Left<L, X>
        is Right -> Right(mapper(right))
    }
}

class Left<out L, out R>(val left: L): Either<L, R>()
class Right<out L, out R>(val right: R): Either<L, R>()

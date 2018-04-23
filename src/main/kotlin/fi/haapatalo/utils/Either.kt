package fi.haapatalo.utils

sealed class Either<out L, out R> {
    fun isLeft(): Boolean = this is Left
    fun isRight(): Boolean = this is Right

    inline fun isLeftAnd(leftTest: (L) -> Boolean): Boolean {
        return this is Left && leftTest(left)
    }
    inline fun isRightAnd(rightTest: (R) -> Boolean): Boolean {
        return this is Right && rightTest(right)
    }

    fun toLeft(): L = when (this) {
        is Left -> left
        is Right -> throw IllegalStateException("Right cannot be cast toLeft()")
    }
    fun toRight(): R = when (this) {
        is Left -> throw IllegalStateException("Left cannot be cast toRight()")
        is Right -> right
    }

    fun toLeftOrNull(): L? = when (this) {
        is Left -> left
        is Right -> null
    }
    fun toRightOrNull(): R? = when (this) {
        is Left -> null
        is Right -> right
    }

    fun toLeftOptional(): Optional<L> = when (this) {
        is Left -> Some(left)
        is Right -> None
    }
    fun toRightOptional(): Optional<R> = when (this) {
        is Left -> None
        is Right -> Some(right)
    }

    inline fun <X> mapLeft(mapper: (L) -> X): Either<X, R> = when (this) {
        is Left -> Left(mapper(left))
        is Right -> this
    }
    inline fun <X> mapRight(mapper: (R) -> X): Either<L, X> = when (this) {
        is Left -> this
        is Right -> Right(mapper(right))
    }
    inline fun <X> map(mapper: (R) -> X): Either<L, X> = mapRight(mapper)

    inline fun <X> fold(leftMapper: (L) -> X, rightMapper: (R) -> X): X = when (this) {
        is Left -> leftMapper(left)
        is Right -> rightMapper(right)
    }

    inline fun forEach(leftMapper: (L) -> Unit, rightMapper: (R) -> Unit): Unit = when (this) {
        is Left -> leftMapper(left)
        is Right -> rightMapper(right)
    }
}

data class Left<out L>(val left: L): Either<L, Nothing>() {
    override fun toString() = "Left($left)"
}
data class Right<out R>(val right: R): Either<Nothing, R>() {
    override fun toString() = "Right($right)"
}

typealias Try<R> = Either<Throwable, R>

fun <T> tryTo(f: () -> T): Try<T> = try {
    Right(f())
} catch (e: Throwable) {
    Left(e)
}

fun <L, R, X> Either<L, R>.flatMapRight(mapper: (R) -> Either<L, X>): Either<L, X> = when (this) {
    is Left -> this
    is Right -> mapper(right)
}

fun <L, R, X> Either<L, R>.flatMapLeft(mapper: (L) -> Either<X, R>): Either<X, R> = when (this) {
    is Left -> mapper(left)
    is Right -> this
}

fun <L, R> Either<L, R>.toRightOr(defValue: R): R = when (this) {
    is Left -> defValue
    is Right -> right
}

fun <L, R> Either<L, R>.toLeftOr(defValue: L): L = when (this) {
    is Left -> left
    is Right -> defValue
}

fun <L, R> Boolean.fold(onFalse: () -> L, onTrue: () -> R): Either<L, R> = when (this) {
    false -> Left(onFalse())
    true -> Right(onTrue())
}

package fi.haapatalo.utils

import org.junit.Assert
import org.junit.Test

class OptionalTest {

    @Test
    fun extendStringWorks() {
        val a: String? = "foo"
        Assert.assertEquals(Some("foo"), a.toOptional())
    }

    @Test
    fun extendNullWorks() {
        val a: String? = null
        Assert.assertEquals(None, a.toOptional())
    }
}

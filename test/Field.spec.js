describe('adds validation capabilities to Gisele fields and models', function() {
    describe('Field.validate()', function() {
        it('should return true', function() {
            let Field = Gisele.Field;

            // default implementation: noop
            expect(Field.prototype.validate()).toBe(true);
        });
    });
});
